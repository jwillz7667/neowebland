# NeoWebLand

NeoWebLand is an ultra-modern web design agency landing page, crafted to showcase a premium web design agency's capabilities. It features immersive visual experiences, interactive elements, and modern UI/UX patterns that demonstrate the agency's expertise in contemporary web design.

## Overview

NeoWebLand features a comprehensive architecture integrating a ReactJS frontend and an Express-based backend. The frontend resides in the `client/` directory and leverages Vite for its development server, while the backend is located in the `server/` directory, using MongoDB for database support via Mongoose. Notable libraries and technologies utilized in the project include shadcn-ui component library, Tailwind CSS, Three.js, Framer Motion, GSAP, and Lottie for frontend enhancement.

The project structure includes:
- **Client**: ReactJS frontend using Vite, structured under `client/src` with a focus on modular and reusable components.
- **Server**: ExpressJS backend implementing various REST API endpoints, structured under `api/`.
- **Concurrent Operation**: Both client and server applications run concurrently using the command `npm run start`.

## Features

The landing page includes a multitude of advanced features to engage users and demonstrate the web design agency's capabilities:

- **Hero Section**: Animated typography, interactive 3D elements, video backgrounds, magnetic call-to-action buttons, and scroll indicators.
- **Navigation Experience**: Glassmorphism headers, smooth scroll navigation, mobile hamburger menus, and progress indicators.
- **Portfolio Showcase**: Masonry grid layout, hover reveal effects, lightbox gallery, filter animations, and lazy loading of images.
- **Services Section**: Interactive cards, icon animations, accordion-style expandable content, and pricing toggles.
- **Team/About Section**: Team member cards, parallax backgrounds, counter animations, and a timeline component.
- **Contact/CTA Section**: Floating contact form, interactive map, social media integration, and a newsletter signup.
- **Interactive Features**: Micro-interactions, scroll-triggered animations, and mobile-optimized experiences.
- **Performance**: Optimized images, smooth animations, progressive loading, and utilization of Intersection Observer.

## Getting Started

### Requirements
- Node.js (version 14.x or higher)
- npm (version 6.x or higher)
- MongoDB (version 4.x or higher)

### Quickstart

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-repository/neowebland.git
   cd neowebland
   ```

2. **Install project dependencies:**
   ```sh
   npm install
   ```

3. **Configuration:**
   - Ensure that MongoDB is running.
   - Create a `.env` file in the `server/` directory with the necessary environment variables like `PORT`, `DATABASE_URL`, `JWT_SECRET`, etc.

4. **Start the project:**
   ```sh
   npm run start
   ```

This command will concurrently start both the frontend (available at `http://localhost:5173`) and the backend (available at `http://localhost:3000`).

### License

The project is proprietary. All Rights Reserved © 2024.

---

This README.md provides a comprehensive guide to understanding the project's purpose, structure, features, and setup process. For more detailed information, refer to the documentation and inline comments within the code.