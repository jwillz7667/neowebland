// Load environment variables with validation
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const basicRoutes = require("./routes/index");
const portfolioRoutes = require("./routes/portfolioRoutes");
const mockupRoutes = require("./routes/mockupRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const contactRoutes = require("./routes/contactRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const { connectDB, validateDatabaseConnection } = require("./config/database");
const cors = require("cors");

// Environment validation with security hardening
const requiredEnvVars = {
  DATABASE_URL: process.env.DATABASE_URL || process.env.MONGODB_URI,
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development'
};

const optionalEnvVars = {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  SESSION_SECRET: process.env.SESSION_SECRET || 'fallback-secret-change-in-production'
};

// Service status tracking
let serviceStatus = {
  database: false,
  server: false,
  ai_chat: !!optionalEnvVars.GEMINI_API_KEY
};

// Validate critical environment variables
function validateEnvironment() {
  const missing = [];
  const warnings = [];
  
  if (!requiredEnvVars.DATABASE_URL) {
    missing.push('DATABASE_URL (or MONGODB_URI)');
  }
  
  if (missing.length > 0) {
    console.error(`❌ Critical environment variables missing: ${missing.join(', ')}`);
    console.error('💡 Set these variables in your Railway dashboard under Variables tab');
    console.error('📖 DATABASE_URL should be your MongoDB connection string');
    console.error('⚠️  Server will start in limited mode without database features');
    return { valid: false, canStartLimited: true };
  }
  
  // Warn about optional services
  if (!optionalEnvVars.GEMINI_API_KEY) {
    warnings.push('GEMINI_API_KEY not found - AI chat features will be limited');
  }
  
  if (optionalEnvVars.SESSION_SECRET === 'fallback-secret-change-in-production' && requiredEnvVars.NODE_ENV === 'production') {
    warnings.push('Using default SESSION_SECRET in production - set a secure value');
  }
  
  warnings.forEach(warning => console.warn(`⚠️  ${warning}`));
  
  return { valid: true, canStartLimited: true };
}

// Initialize database connection with improved retry logic
async function initializeDatabase() {
  if (!requiredEnvVars.DATABASE_URL) {
    console.warn('⚠️  Skipping database connection - DATABASE_URL not provided');
    return;
  }

  const maxRetries = 5;
  let retryCount = 0;

  const attemptConnection = async () => {
    try {
      console.log(`🔌 Attempting database connection... (${retryCount + 1}/${maxRetries})`);
      await connectDB();
      serviceStatus.database = true;
      console.log('✅ Database connected successfully');
      return true;
    } catch (error) {
      retryCount++;
      console.error(`❌ Database connection failed (attempt ${retryCount}/${maxRetries}):`, error.message);
      
      if (retryCount < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, retryCount), 30000); // Exponential backoff, max 30s
        console.log(`🔄 Retrying in ${delay/1000} seconds...`);
        setTimeout(attemptConnection, delay);
      } else {
        console.error('💥 Database connection failed after all retries');
        serviceStatus.database = false;
      }
      return false;
    }
  };

  // Start initial connection attempt
  await attemptConnection();
}

// Main server startup function
async function startServer() {
  const validation = validateEnvironment();
  
  if (!validation.canStartLimited) {
    console.error('💥 Cannot start server - critical configuration missing');
    process.exit(1);
  }

  const app = express();
  const port = requiredEnvVars.PORT;

  // Security middleware
  app.disable('x-powered-by'); // Hide Express signature
  app.enable('json spaces'); // Pretty-print JSON responses
  app.enable('strict routing'); // Consistent URL paths

  // CORS configuration with security headers
  app.use(cors({
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : true,
    credentials: true,
    optionsSuccessStatus: 200
  }));

  // Security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Initialize database connection (non-blocking)
  initializeDatabase();

  // Error handling
  app.on("error", (error) => {
    console.error(`🚨 Server error: ${error.message}`);
    console.error(error.stack);
  });

  // Database-dependent route middleware (MUST be before routes)
  app.use('/api', (req, res, next) => {
    // For routes that require database, check status
    const databaseRequiredRoutes = ['/portfolio', '/contacts', '/services'];
    const requiresDatabase = databaseRequiredRoutes.some(route => req.path.startsWith(route));
    
    if (requiresDatabase && !serviceStatus.database) {
      return res.status(503).json({
        error: 'Service Unavailable',
        message: 'Database connection required for this endpoint',
        status: 'degraded'
      });
    }
    next();
  });

  // Routes
  app.use(basicRoutes);
  app.use('/api', portfolioRoutes);
  app.use('/api', mockupRoutes);
  app.use('/api', serviceRoutes);
  app.use('/api', contactRoutes);
  app.use('/api', chatbotRoutes);

  // Health check with service status
  app.get('/api/health', async (req, res) => {
    const health = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      environment: requiredEnvVars.NODE_ENV,
      services: {
        database: serviceStatus.database,
        ai_chat: serviceStatus.ai_chat,
        server: serviceStatus.server
      }
    };

    // Update database status
    if (serviceStatus.database) {
      try {
        await validateDatabaseConnection();
        health.services.database = true;
      } catch (error) {
        health.services.database = false;
        serviceStatus.database = false;
      }
    }

    // Determine overall status
    if (!health.services.database) {
      health.status = 'DEGRADED';
      health.message = 'Running in limited mode - some features unavailable';
    }

    // Always return 200 for Railway healthcheck
    res.status(200).json(health);
  });

  // System status endpoint
  app.get('/api/status', (req, res) => {
    res.json({
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      environment: requiredEnvVars.NODE_ENV,
      services: serviceStatus,
      configuration: {
        database_configured: !!requiredEnvVars.DATABASE_URL,
        ai_configured: !!optionalEnvVars.GEMINI_API_KEY
      }
    });
  });

  // Default route
  app.get('/', (req, res) => {
    res.json({ 
      message: 'WebNaster.com API Server',
      version: '1.0.0',
      status: serviceStatus.database ? 'Fully operational' : 'Limited mode',
      documentation: '/api/health'
    });
  });



  // Global error handling
  app.use((err, req, res, next) => {
    console.error(`🚨 Unhandled application error: ${err.message}`);
    console.error(err.stack);
    
    res.status(500).json({
      error: 'Internal Server Error',
      message: requiredEnvVars.NODE_ENV === 'development' ? err.message : 'Something went wrong',
      timestamp: new Date().toISOString()
    });
  });

  // Graceful shutdown handling
  process.on('SIGTERM', () => {
    console.log('📴 SIGTERM received, shutting down gracefully');
    if (serviceStatus.database) {
      mongoose.connection.close(() => {
        console.log('🔌 Database connection closed');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });

  process.on('SIGINT', () => {
    console.log('📴 SIGINT received, shutting down gracefully');
    if (serviceStatus.database) {
      mongoose.connection.close(() => {
        console.log('🔌 Database connection closed');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });

  // Start the server
  const server = app.listen(port, () => {
    serviceStatus.server = true;
    console.log(`🚀 Server running at http://localhost:${port}`);
    console.log(`🌍 Environment: ${requiredEnvVars.NODE_ENV}`);
    console.log(`📊 Health check: http://localhost:${port}/api/health`);
    console.log(`💡 Database: ${serviceStatus.database ? 'Connected' : 'Limited mode'}`);
    console.log(`🤖 AI Features: ${serviceStatus.ai_chat ? 'Enabled' : 'Limited'}`);
  });

  // Handle server startup errors
  server.on('error', (error) => {
    console.error('💥 Server startup error:', error);
    process.exit(1);
  });
}

// Start the server immediately
startServer().catch(error => {
  console.error('💥 Failed to start server:', error);
  process.exit(1);
});