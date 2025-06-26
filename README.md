# WebNaster.com - Premium Web Design & Development Agency

A modern, fully responsive web design agency website built with React, TypeScript, and Node.js. Optimized for SEO and ready for production deployment on Netlify.

## 🚀 Features

- **Modern React Architecture**: Built with React 18, TypeScript, and Vite
- **Comprehensive SEO**: Complete meta tags, structured data, and sitemap
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Performance Optimized**: Lazy loading, code splitting, and optimized assets
- **Accessibility**: WCAG 2.1 AA compliant
- **PWA Ready**: Web app manifest and service worker support
- **Analytics Ready**: Google Analytics and conversion tracking setup

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
- **JWT** authentication
- **Multer** for file uploads
- **CORS** enabled

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/neowebland.git
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
   MONGODB_URI=mongodb://localhost:27017/webnaster
   JWT_SECRET=your-secret-key
   GEMINI_API_KEY=your-gemini-api-key
   ```

4. **Start development servers**
   ```bash
   npm start
   ```

## 🌐 Deployment

### Netlify Deployment (Recommended)

1. **Connect your repository** to Netlify
2. **Configure build settings**:
   - Build command: `npm run build:netlify`
   - Publish directory: `client/dist`
   - Node version: `18`

3. **Environment variables** (if using API):
   - Set `REACT_APP_API_URL` to your backend URL

4. **Deploy**: Push to main branch for automatic deployment

### Manual Deployment

1. **Build the project**:
   ```bash
   npm run build:netlify
   ```

2. **Upload `client/dist/` folder** to your hosting provider

### Backend Deployment (Optional)

For full functionality, deploy the backend to:
- **Heroku**: Use the included `Procfile`
- **Railway**: Direct deployment from Git
- **DigitalOcean**: Use App Platform

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

### Page-Specific SEO
Each page includes:
- Unique title and meta description
- Relevant keywords
- Open Graph tags
- Twitter Card tags
- Structured data (JSON-LD)
- Breadcrumb navigation

## 📱 PWA Features

- **Web App Manifest**: Native app-like experience
- **Responsive Icons**: All required icon sizes
- **Offline Support**: Service worker ready
- **Mobile Optimization**: Touch-friendly interface

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
- **Bundle Size**: Optimized with code splitting
- **Images**: Lazy loading and WebP support
- **Caching**: Aggressive caching strategies

## 🎨 Customization

### Brand Colors
Update brand colors in:
- `client/tailwind.config.js`
- `client/src/data/seoData.ts`
- `client/index.html`

### Content
Update content in:
- `client/src/data/seoData.ts` - SEO data
- Page components in `client/src/pages/`
- Service data in component files

### Images
Add your images to `client/public/`:
- `og-image.jpg` (1200x630) - Open Graph image
- Favicon files (various sizes)
- Logo and brand assets

## 🔐 Security

- **HTTPS Enforced**: Automatic HTTPS redirects
- **Security Headers**: CSP, HSTS, and more
- **Input Validation**: Server-side validation
- **CORS**: Properly configured cross-origin requests

## 📈 Analytics & Tracking

Ready for:
- **Google Analytics 4**
- **Google Tag Manager**
- **Facebook Pixel**
- **Conversion tracking**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: info@webnaster.com
- Website: https://webnaster.com
- Documentation: Check the docs folder

## 🚀 Quick Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/neowebland)

---

Built with ❤️ by the WebNaster team