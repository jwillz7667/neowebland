const Service = require('../models/Service');

const defaultServices = [
  {
    title: "Web Development",
    description: "Custom websites built with cutting-edge technologies and optimized for performance.",
    features: ["React & Next.js", "Node.js Backend", "Database Integration", "API Development"],
    price: 2500,
    category: "Development",
    icon: "Code",
    status: "active"
  },
  {
    title: "UI/UX Design",
    description: "Beautiful, intuitive designs that create memorable user experiences.",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    price: 1500,
    category: "Design",
    icon: "Palette",
    status: "active"
  },
  {
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    features: ["React Native", "Flutter", "Native iOS/Android", "App Store Optimization"],
    price: 5000,
    category: "Development",
    icon: "Smartphone",
    status: "active"
  },
  {
    title: "E-commerce",
    description: "Complete e-commerce solutions that drive sales and grow your business.",
    features: ["Shopify", "WooCommerce", "Custom Solutions", "Payment Integration"],
    price: 3500,
    category: "Development",
    icon: "Globe",
    status: "active"
  },
  {
    title: "SEO Services",
    description: "Boost your search engine rankings and drive organic traffic.",
    features: ["Keyword Research", "On-Page SEO", "Technical SEO", "Content Strategy"],
    price: 1200,
    category: "Marketing",
    icon: "Zap",
    status: "active"
  },
  {
    title: "Digital Marketing",
    description: "Comprehensive digital marketing strategies to grow your online presence.",
    features: ["Social Media Marketing", "PPC Advertising", "Email Marketing", "Analytics"],
    price: 2000,
    category: "Marketing",
    icon: "Users",
    status: "active"
  }
];

async function seedServices() {
  try {
    console.log('Starting service seeding...');
    
    // Check if services already exist
    const existingServices = await Service.find();
    if (existingServices.length > 0) {
      console.log('Services already exist, skipping seeding');
      return;
    }

    // Insert default services
    const services = await Service.insertMany(defaultServices);
    console.log(`Successfully seeded ${services.length} services`);
    
    return services;
  } catch (error) {
    console.error('Error seeding services:', error);
    throw error;
  }
}

module.exports = { seedServices, defaultServices };