# Railway Deployment Guide

## ⚠️ **SECURITY WARNING**
**NEVER commit actual database credentials or API keys to version control!**
All values below are placeholders - replace with your actual credentials in Railway environment variables only.

## Critical Environment Variables

Your application requires the following environment variables to be set in your Railway project:

### Required Variables

1. **DATABASE_URL** (Critical)
   ```
   Variable: DATABASE_URL
   Value: [Get from MongoDB Atlas - Connect -> Connect your application]
   ```
   **MongoDB Connection String Format:**
   - Protocol: `mongodb+srv://`
   - Credentials: `<username>:<password>@` 
   - Host: `<cluster>.mongodb.net/` 
   - Database: `<database_name>`
   - **MUST** be set for the application to start
   - Get this from MongoDB Atlas or your MongoDB provider
   - **NEVER** commit actual credentials to version control

### Optional Variables (Recommended)

2. **GEMINI_API_KEY** (AI Features)
   ```
   Variable: GEMINI_API_KEY
   Value: your_google_gemini_api_key_here
   ```
   - Enables AI-powered website mockup generation
   - Without this, the app uses template-based fallbacks
   - Get from Google AI Studio (ai.google.dev)

3. **NODE_ENV** (Environment)
   ```
   Variable: NODE_ENV
   Value: production
   ```

4. **SESSION_SECRET** (Security)
   ```
   Variable: SESSION_SECRET
   Value: generate_a_secure_random_string_here
   ```
   - Use a cryptographically secure random string
   - Generate with: `openssl rand -hex 32`

5. **ALLOWED_ORIGINS** (CORS Security)
   ```
   Variable: ALLOWED_ORIGINS
   Value: https://yourdomain.com,https://www.yourdomain.com
   ```
   - Comma-separated list of allowed origins
   - Restricts CORS to specific domains

## Setting Variables in Railway

1. **Navigate to your Railway project dashboard**
2. **Go to the Variables tab**
3. **Add each variable**:
   - Click "New Variable"
   - Enter variable name (e.g., `DATABASE_URL`)
   - Enter variable value
   - Click "Add"

4. **Deploy the changes**:
   - Variables are automatically applied on next deployment
   - Trigger redeploy if needed

## MongoDB Setup

### Option 1: MongoDB Atlas (Recommended)
1. Sign up at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a new cluster (free tier available)
3. Create a database user
4. Get connection string from "Connect" → "Connect your application"
5. Use the connection string as your `DATABASE_URL`

### Option 2: Railway MongoDB Plugin
1. Add MongoDB plugin to your Railway project
2. Use the provided connection string
3. Set as `DATABASE_URL` variable

## Google Gemini API Setup

1. Go to [Google AI Studio](https://ai.google.dev)
2. Create a new API key
3. Set the key as `GEMINI_API_KEY` variable
4. **Important**: Restrict API key usage in Google Cloud Console

## Security Checklist

- [ ] Set `DATABASE_URL` with proper authentication
- [ ] Use a strong `SESSION_SECRET` (32+ characters)
- [ ] Restrict `ALLOWED_ORIGINS` to your domains only
- [ ] Set `NODE_ENV=production`
- [ ] Enable Railway's built-in DDoS protection
- [ ] Monitor logs for security issues

## Troubleshooting

### Database Connection Issues
```bash
# Check logs for these patterns:
❌ Database connection failed
💥 Database connection error
⚠️  Database disconnected
```

**Solutions**:
1. Verify `DATABASE_URL` is correct
2. Check MongoDB Atlas network access (allow all IPs: 0.0.0.0/0)
3. Verify database credentials
4. Check MongoDB Atlas cluster status

### AI Service Issues
```bash
# These are warnings, not errors:
⚠️  GEMINI_API_KEY not found
🔄 AI service unavailable, using fallback
```

**Solutions**:
1. Add `GEMINI_API_KEY` variable
2. Verify API key is valid
3. Check Google AI Studio quotas

### General Deployment Issues
```bash
# Health check endpoint:
GET https://your-app.railway.app/api/health

# Should return:
{
  "status": "OK",
  "services": {
    "database": true,
    "ai_chat": true
  }
}
```

## Production Security Hardening

### 1. Database Security
- Use MongoDB Atlas with IP whitelisting when possible
- Enable MongoDB authentication
- Use read-only replicas for queries when available
- Regular database backups

### 2. API Security
- Rate limiting (consider adding rate-limit middleware)
- Input validation and sanitization
- HTTPS enforcement (Railway provides this)
- Security headers (already implemented)

### 3. Application Security
- Regular dependency updates (`npm audit`)
- Environment variable validation (implemented)
- Error handling without information disclosure
- Logging and monitoring

### 4. Network Security
- Use Railway's private networking when available
- Restrict CORS origins
- Implement proper authentication for sensitive endpoints

## Monitoring

### Health Checks
- Primary: `/api/health`
- System status: `/api/status`
- Uptime monitoring recommended

### Logging
```bash
# Key log patterns to monitor:
✅ Database connected successfully
🚀 Server running at http://localhost:3000
⚠️  Warning patterns for attention
❌ Error patterns requiring immediate action
```

### Performance Monitoring
- Database connection pool usage
- Response times for AI generation
- Memory usage patterns
- Error rates

## Backup and Recovery

### Database Backups
- MongoDB Atlas: Automatic backups enabled
- Manual exports recommended for critical data
- Test restoration procedures regularly

### Application Recovery
- Railway provides automatic deployments from Git
- Keep environment variables documented
- Maintain deployment configuration in version control

## Support

If you encounter issues:

1. **Check Railway logs**: Project → Logs tab
2. **Verify environment variables**: Project → Variables tab
3. **Test health endpoint**: `curl https://your-app.railway.app/api/health`
4. **Check service status**: Individual service dashboards

---

**Last Updated**: January 2024
**Compatible with**: Railway v2, Node.js 18+, MongoDB 4.4+ 