const Service = require('../models/Service');
const mongoose = require('mongoose');

class ServiceService {
  async createService(serviceData) {
    try {
      console.log('Creating new service:', serviceData.title);
      const service = new Service(serviceData);
      const savedService = await service.save();
      console.log('Service created successfully:', savedService._id);
      return savedService;
    } catch (error) {
      console.error('Error creating service:', error.message);
      throw new Error(`Failed to create service: ${error.message}`);
    }
  }

  async getAllServices() {
    try {
      // Check database connection first
      if (mongoose.connection.readyState !== 1) {
        throw new Error('Database not connected. Connection state: ' + mongoose.connection.readyState);
      }

      console.log('Service: Fetching all services from database');
      const services = await Service.find({ status: { $ne: 'draft' } }).sort({ order: 1, createdAt: -1 });
      console.log(`Service: Database query completed. Found ${services.length} services`);

      if (services.length === 0) {
        console.log('Service: No services found in database. Seeding default services...');
        await this.seedDefaultServices();
        // Fetch again after seeding
        const seededServices = await Service.find({ status: { $ne: 'draft' } }).sort({ order: 1, createdAt: -1 });
        console.log(`Service: After seeding, found ${seededServices.length} services`);
        return seededServices;
      } else {
        console.log('Service: First service sample:', {
          id: services[0]._id,
          title: services[0].title,
          status: services[0].status
        });
      }

      return services;
    } catch (error) {
      console.error('Service: Error fetching services:', error.message);
      console.error('Service: Error stack:', error.stack);
      throw new Error(`Failed to fetch services: ${error.message}`);
    }
  }

  async seedDefaultServices() {
    try {
      console.log('Service: Seeding default services...');
      const defaultServices = [
        {
          title: "Web Development",
          description: "Custom websites built with cutting-edge technologies and optimized for performance.",
          features: ["React & Next.js", "Node.js Backend", "Database Integration", "API Development"],
          icon: "Code",
          status: "active",
          order: 1
        },
        {
          title: "UI/UX Design", 
          description: "Beautiful, intuitive designs that create memorable user experiences.",
          features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
          icon: "Palette",
          status: "active",
          order: 2
        },
        {
          title: "Mobile Apps",
          description: "Native and cross-platform mobile applications for iOS and Android.",
          features: ["React Native", "Flutter", "Native iOS/Android", "App Store Optimization"],
          icon: "Smartphone",
          status: "active",
          order: 3
        },
        {
          title: "E-commerce",
          description: "Complete e-commerce solutions that drive sales and grow your business.",
          features: ["Shopify", "WooCommerce", "Custom Solutions", "Payment Integration"],
          icon: "Globe",
          status: "active",
          order: 4
        },
        {
          title: "Performance Optimization",
          description: "Speed up your website and improve user experience with our optimization services.",
          features: ["Core Web Vitals", "SEO Optimization", "CDN Setup", "Caching Strategies"],
          icon: "Zap",
          status: "active",
          order: 5
        },
        {
          title: "Consulting",
          description: "Strategic guidance to help you make the right technology decisions.",
          features: ["Technology Audit", "Architecture Planning", "Team Training", "Project Management"],
          icon: "Users",
          status: "active",
          order: 6
        }
      ];

      const createdServices = await Service.insertMany(defaultServices);
      console.log(`Service: Successfully seeded ${createdServices.length} default services`);
      return createdServices;
    } catch (error) {
      console.error('Service: Error seeding default services:', error.message);
      throw error;
    }
  }

  async getServiceById(serviceId) {
    try {
      console.log('Fetching service by ID:', serviceId);
      const service = await Service.findById(serviceId);
      if (!service) {
        throw new Error('Service not found');
      }
      console.log('Service found:', service.title);
      return service;
    } catch (error) {
      console.error('Error fetching service:', error.message);
      throw new Error(`Failed to fetch service: ${error.message}`);
    }
  }

  async updateService(serviceId, updateData) {
    try {
      console.log('Updating service:', serviceId);
      const service = await Service.findByIdAndUpdate(
        serviceId,
        updateData,
        { new: true, runValidators: true }
      );
      if (!service) {
        throw new Error('Service not found');
      }
      console.log('Service updated successfully:', service.title);
      return service;
    } catch (error) {
      console.error('Error updating service:', error.message);
      throw new Error(`Failed to update service: ${error.message}`);
    }
  }

  async deleteService(serviceId) {
    try {
      console.log('Deleting service:', serviceId);
      const service = await Service.findByIdAndDelete(serviceId);
      if (!service) {
        throw new Error('Service not found');
      }
      console.log('Service deleted successfully:', service.title);
      return { message: 'Service deleted successfully' };
    } catch (error) {
      console.error('Error deleting service:', error.message);
      throw new Error(`Failed to delete service: ${error.message}`);
    }
  }
}

module.exports = new ServiceService();