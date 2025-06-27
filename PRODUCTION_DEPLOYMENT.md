# Production Deployment Guide - WebNaster.com

## ⚠️ **SECURITY WARNING**
**NEVER commit actual database credentials or API keys to version control!**
All values below are placeholders - replace with your actual credentials in Railway environment variables only.

## 🚀 Complete Production Setup for Railway + Netlify

### Architecture Overview
- **Frontend**: Netlify (webnaster.com, www.webnaster.com)
- **Backend**: Railway (api.webnaster.com)
- **Database**: MongoDB Atlas
- **Domain**: webnaster.com

---

## 🔧 **1. Railway Backend Setup**

### Step 1: Deploy to Railway
1. **Connect Repository**
   ```bash
   # Connect your GitHub repository to Railway
   # Go to railway.app → New Project → Deploy from GitHub repo
   ```

2. **Set Environment Variables**
   Go to Railway Dashboard → Your Project → Variables tab:
   
   ```env
   # Required Variables
   DATABASE_URL=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/YOUR_DATABASE_NAME
   NODE_ENV=production
   PORT=3000
   
   # Optional but Recommended
   GEMINI_API_KEY=YOUR_GOOGLE_GEMINI_API_KEY_HERE
   SESSION_SECRET=YOUR_SECURE_RANDOM_STRING_32_CHARS_MIN
   ALLOWED_ORIGINS=https://webnaster.com,https://www.webnaster.com,https://api.webnaster.com
   ```

3. **Custom Domain Setup**
   ```bash
   # In Railway Dashboard → Settings → Domains
   # Add custom domain: api.webnaster.com
   # Copy the CNAME record Railway provides
   ```

### Step 2: DNS Configuration for Backend
Add these DNS records in your domain provider:
```dns
Type: CNAME
Name: api
Value: your-railway-app.railway.app
TTL: 3600
```

---

## 🌐 **2. Netlify Frontend Setup**

### Step 1: Deploy to Netlify
1. **Connect Repository**
   ```bash
   # Go to netlify.com → Add new site → Import an existing project
   # Connect your GitHub repository
   ```

2. **Build Settings**
   ```yaml
   Build command: npm run build:netlify
   Publish directory: client/dist
   Base directory: / (leave empty)
   ```

3. **Environment Variables**
   Go to Netlify Dashboard → Site settings → Environment variables:
   
   ```env
   # Production Environment Variables
   VITE_API_URL=https://api.webnaster.com
   NODE_ENV=production
   ```

### Step 2: Custom Domain Setup
1. **Add Custom Domain**
   ```bash
   # Netlify Dashboard → Domain settings → Add custom domain
   # Primary domain: webnaster.com
   # Add alias: www.webnaster.com
   ```

2. **DNS Configuration**
   Update your DNS provider with these records:
   ```dns
   # For apex domain (webnaster.com)
   Type: A
   Name: @
   Value: 75.2.60.5 (Netlify's load balancer IP)
   
   # For www subdomain
   Type: CNAME  
   Name: www
   Value: webnaster.netlify.app
   
   # Alternative: Use Netlify's nameservers for full DNS management
   ```

3. **SSL Certificate**
   ```bash
   # Netlify automatically provisions Let's Encrypt SSL
   # Enable HTTPS redirect in Netlify settings
   ```

---

## 🔒 **3. Security Configuration**

### Backend Security (Railway)
```env
# Add these to Railway environment variables
ALLOWED_ORIGINS=https://webnaster.com,https://www.webnaster.com
CORS_CREDENTIALS=false
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend Security (Netlify)
Already configured in `netlify.toml`:
- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Frame-Options: DENY
- X-XSS-Protection
- Referrer Policy

---

## 📊 **4. Monitoring & Health Checks**

### Health Check Endpoints
```bash
# Backend Health Check
curl https://api.webnaster.com/api/health

# Expected Response:
{
  "status": "OK",
  "services": {
    "database": true,
    "ai_chat": true,
    "server": true
  }
}
```

### Monitoring Setup
1. **Railway Monitoring**
   - Built-in metrics dashboard
   - Set up alerts for downtime
   - Monitor memory and CPU usage

2. **Netlify Monitoring**
   - Deploy notifications
   - Form submissions tracking
   - Bandwidth monitoring

3. **External Monitoring** (Recommended)
   ```bash
   # Set up monitoring with services like:
   # - UptimeRobot (free)
   # - Pingdom
   # - New Relic
   # - DataDog
   ```

---

## 🚀 **5. Deployment Workflow**

### Automated Deployment
```yaml
# Both platforms deploy automatically on git push to main branch

# Development Workflow:
git checkout develop
# Make changes
git add .
git commit -m "feat: new feature"
git push origin develop

# Production Deployment:
git checkout main
git merge develop
git push origin main
# Both Railway and Netlify auto-deploy
```

### Manual Deployment Commands
```bash
# Frontend (if needed)
npm run build:netlify
# Upload dist folder to Netlify

# Backend (if needed)
cd server
npm install --production
npm start
```

---

## 🔍 **6. Testing Production Setup**

### Pre-deployment Checklist
- [ ] Database connection string configured
- [ ] API endpoints accessible from frontend
- [ ] CORS configured for production domains
- [ ] SSL certificates active
- [ ] Environment variables set correctly
- [ ] Health checks passing

### Testing Commands
```bash
# Test API connectivity
curl -X GET https://api.webnaster.com/api/health

# Test CORS
curl -H "Origin: https://webnaster.com" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     https://api.webnaster.com/api/contacts

# Test frontend API calls
# Open browser dev tools on webnaster.com
# Check Network tab for API calls to api.webnaster.com
```

---

## 🐛 **7. Troubleshooting**

### Common Issues & Solutions

#### CORS Errors
```bash
# Symptoms: "Access to fetch blocked by CORS policy"
# Solution: Check ALLOWED_ORIGINS in Railway environment variables
ALLOWED_ORIGINS=https://webnaster.com,https://www.webnaster.com
```

#### API Connection Failures
```bash
# Symptoms: Network errors, failed API calls
# Solution: Verify API URL in frontend environment variables
VITE_API_URL=https://api.webnaster.com
```

#### SSL Certificate Issues
```bash
# Symptoms: "Your connection is not private"
# Solution: 
# 1. Wait for DNS propagation (up to 48 hours)
# 2. Clear browser cache
# 3. Check domain configuration in Netlify
```

#### Database Connection Issues
```bash
# Symptoms: "Database connection failed"
# Solution: Check MongoDB Atlas
# 1. Verify connection string
# 2. Check IP whitelist (set to 0.0.0.0/0 for Railway)
# 3. Verify database user permissions
```

### Debug Commands
```bash
# Check DNS resolution
nslookup webnaster.com
nslookup api.webnaster.com
nslookup www.webnaster.com

# Test API endpoint
curl -v https://api.webnaster.com/api/health

# Check SSL certificate
openssl s_client -connect webnaster.com:443 -servername webnaster.com
```

---

## 📈 **8. Performance Optimization**

### Frontend Optimization
- Static asset caching (configured in netlify.toml)
- Image compression enabled
- Minification enabled
- CDN distribution (Netlify's global CDN)

### Backend Optimization
- Database connection pooling configured
- API response caching headers
- Gzip compression enabled
- Resource monitoring

---

## 🔄 **9. Backup & Recovery**

### Database Backup
```bash
# MongoDB Atlas automatic backups enabled
# Manual backup command:
mongodump --uri="mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/YOUR_DATABASE_NAME"
```

### Code Backup
- Git repository serves as code backup
- Both platforms deploy from Git
- Keep environment variables documented securely

---

## 📞 **10. Support & Maintenance**

### Regular Maintenance Tasks
- [ ] Monitor server performance weekly
- [ ] Update dependencies monthly
- [ ] Check SSL certificate expiration
- [ ] Review security logs
- [ ] Database maintenance (indexes, cleanup)

### Getting Help
- **Railway**: [docs.railway.app](https://docs.railway.app)
- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)

---

## ✅ **Final Checklist**

Before going live:
- [ ] All environment variables configured
- [ ] DNS records pointing correctly
- [ ] SSL certificates active
- [ ] Health checks passing
- [ ] API endpoints working from frontend
- [ ] Database connected and accessible
- [ ] Monitoring set up
- [ ] Backup procedures tested
- [ ] Performance optimizations applied
- [ ] Security headers configured

---

**🎉 Your production deployment should now be live at https://webnaster.com with API at https://api.webnaster.com!**

**Last Updated**: January 2024  
**Compatible with**: Railway v2, Netlify, Node.js 18+, MongoDB 4.4+ 