# WebNaster.com - Premium Web Design & Development Agency

A modern, fully responsive web design agency website built with React, TypeScript, and Node.js. Features AI-powered mockup generation using Google Gemini AI. Optimized for SEO and ready for production deployment.

## 🚀 Features

- **AI-Powered Mockup Generator**: Generate professional website mockups using Google Gemini AI
- **Modern React Architecture**: Built with React 18, TypeScript, and Vite
- **Comprehensive SEO**: Complete meta tags, structured data, and sitemap
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Performance Optimized**: Lazy loading, code splitting, and optimized assets
- **Professional Templates**: Industry-specific website templates
- **Backend API**: Full-featured Node.js backend with MongoDB

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **React Helmet Async** for SEO

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **Google Gemini AI** for mockup generation
- **Professional Website Templates**
- **JWT** authentication
- **CORS** enabled

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jwillz7667/neowebland.git
   cd neowebland
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   Create a `.env` file in the server directory:
   ```env
   PORT=3000
   DATABASE_URL=mongodb://localhost:27017/webnaster
   JWT_SECRET=your-secret-key
   GEMINI_API_KEY=your-gemini-api-key
   REFRESH_TOKEN_SECRET=your-refresh-token-secret
   NODE_ENV=development
   ```

4. **Start development servers**
   ```bash
   npm start
   ```

## 🌐 Deployment

### Frontend Deployment (Netlify)

1. **Connect your repository** to Netlify
2. **Configure build settings**:
   - Build command: `npm run build:netlify`
   - Publish directory: `client/dist`
   - Node version: `18`

3. **Environment variables** (optional):
   - Set `REACT_APP_API_URL` to your backend URL

4. **Deploy**: Push to main branch for automatic deployment

### Backend Deployment

#### Option 1: Railway (Recommended)

1. **Sign up at [Railway.app](https://railway.app)**
2. **Create a new project** and connect your GitHub repository
3. **Set environment variables**:
   - `DATABASE_URL`: MongoDB connection string
   - `GEMINI_API_KEY`: Your Google Gemini AI API key
   - `JWT_SECRET`: Random secret key
   - `REFRESH_TOKEN_SECRET`: Random secret key
   - `NODE_ENV`: production

4. **Deploy**: Railway will automatically build and deploy from the server directory

#### Option 2: Heroku

1. **Install Heroku CLI** and login
2. **Create Heroku app**:
   ```bash
   heroku create your-app-name
   ```

3. **Add MongoDB addon**:
   ```bash
   heroku addons:create mongolab:sandbox
   ```

4. **Set environment variables**:
   ```bash
   heroku config:set GEMINI_API_KEY=your-gemini-api-key
   heroku config:set JWT_SECRET=your-jwt-secret
   heroku config:set REFRESH_TOKEN_SECRET=your-refresh-token-secret
   ```

5. **Deploy server**:
   ```bash
   git subtree push --prefix server heroku main
   ```

#### Option 3: DigitalOcean App Platform

1. **Create app** on DigitalOcean App Platform
2. **Connect repository** and set build settings:
   - Source directory: `server`
   - Build command: `npm install`
   - Run command: `npm start`

3. **Set environment variables** in the app settings

### Update Frontend to Use Deployed Backend

After deploying the backend, update `netlify.toml`:

```toml
[[redirects]]
  from = "/api/*"
  to = "https://your-backend-url.com/api/:splat"
  status = 200
  force = true
```

## 🤖 AI Mockup Generator

The AI mockup generator uses Google Gemini AI to create professional website mockups:

### Features
- **Industry-specific templates** for restaurants, e-commerce, healthcare, etc.
- **Custom content generation** based on company information
- **Professional design systems** with colors, typography, and layouts
- **Realistic mockup previews** with multiple viewport sizes
- **Project quotes** with detailed pricing and timelines

### API Endpoints
- `POST /api/mockup/generate` - Generate mockup and quote
- `POST /api/generate-mockup` - Generate mockup only
- `POST /api/project-quote` - Generate project quote
- `GET /api/mockup/templates` - Get available templates

### Environment Setup for AI
1. **Get Google Gemini API key** from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Add to environment variables**:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

## 🔍 SEO Configuration

### Comprehensive SEO Features
- **Meta Tags**: Title, description, keywords, and Open Graph
- **Structured Data**: JSON-LD for business, services, and pages
- **Sitemap**: XML sitemap with all pages
- **Robots.txt**: Search engine directives
- **Canonical URLs**: Prevent duplicate content
- **Breadcrumbs**: Structured navigation

### SEO Files Included
- `/client/public/sitemap.xml` - XML sitemap
- `/client/public/robots.txt` - Search engine directives
- `/client/public/site.webmanifest` - PWA manifest
- `/client/public/_redirects` - Netlify redirects
- `/client/src/data/seoData.ts` - SEO configuration

## 🔧 Build Scripts

```bash
# Development
npm run client          # Start client dev server
npm run server          # Start backend server
npm start              # Start both servers

# Production
npm run build          # Build client only
npm run build:netlify  # Build for Netlify deployment
npm run preview        # Preview production build

# Utilities
npm run lint           # Lint code
npm run clean          # Clean build files
```

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for Google ranking factors
- **AI Response Time**: ~3-5 seconds for mockup generation
- **Bundle Size**: Optimized with code splitting
- **Caching**: Aggressive caching strategies

## 🎨 Customization

### Backend Configuration
Update backend settings in:
- `server/.env` - Environment variables
- `server/services/websiteTemplates.js` - Website templates
- `server/services/geminiService.js` - AI prompts and logic

### Frontend Configuration
Update frontend in:
- `client/src/data/seoData.ts` - SEO data
- `client/src/components/` - UI components
- `netlify.toml` - Backend API URL

## 🔐 Security

- **Environment Variables**: Secure API key storage
- **CORS**: Properly configured cross-origin requests
- **Input Validation**: Server-side validation
- **Security Headers**: CSP, HSTS, and more
- **Rate Limiting**: Prevent API abuse

## 🆘 Support

For support and questions:
- Email: info@webnaster.com
- Website: https://webnaster.com
- GitHub Issues: [Create an issue](https://github.com/jwillz7667/neowebland/issues)

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ by the WebNaster team