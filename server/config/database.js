const mongoose = require('mongoose');

// Connection configuration with security settings
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10, // Maximum number of connections
  serverSelectionTimeoutMS: 10000, // Increased timeout for server selection
  socketTimeoutMS: 45000, // How long a socket stays open
  connectTimeoutMS: 10000, // How long to wait for initial connection
  family: 4, // Use IPv4, skip trying IPv6
  retryWrites: true,
  w: 'majority', // Write concern
  readPreference: 'primary', // Read from primary for consistency
  bufferMaxEntries: 0, // Disable mongoose buffering
  bufferCommands: true, // Enable buffering to queue commands while connecting
  maxBufferSize: 16777216, // 16MB buffer size
};

const connectDB = async () => {
  try {
    const databaseUrl = process.env.DATABASE_URL || process.env.MONGODB_URI;
    
    if (!databaseUrl) {
      throw new Error('Database URL not provided');
    }

    // Validate database URL format for security
    if (!databaseUrl.startsWith('mongodb://') && !databaseUrl.startsWith('mongodb+srv://')) {
      throw new Error('Invalid database URL format - must be MongoDB connection string');
    }

    console.log('🔌 Connecting to database...');
    
    const conn = await mongoose.connect(databaseUrl, connectionOptions);
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database Name: ${conn.connection.name}`);
    
    // Set up connection event handlers
    mongoose.connection.on('error', (err) => {
      console.error('❌ Database connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  Database disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 Database reconnected');
    });

    return conn;
  } catch (error) {
    console.error('💥 Database connection error:', error.message);
    throw error;
  }
};

// Validate active database connection
const validateDatabaseConnection = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }
    
    // Ping the database to ensure it's responsive
    await mongoose.connection.db.admin().ping();
    return true;
  } catch (error) {
    console.error('Database validation failed:', error.message);
    throw error;
  }
};

// Get database connection status
const getDatabaseStatus = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  return {
    state: states[mongoose.connection.readyState] || 'unknown',
    host: mongoose.connection.host,
    name: mongoose.connection.name,
    port: mongoose.connection.port
  };
};

// Graceful database disconnect
const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed gracefully');
  } catch (error) {
    console.error('❌ Error closing database connection:', error);
    throw error;
  }
};

module.exports = { 
  connectDB, 
  validateDatabaseConnection, 
  getDatabaseStatus, 
  disconnectDB 
};