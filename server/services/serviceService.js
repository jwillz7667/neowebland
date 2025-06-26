const Service = require('../models/Service');

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
      console.log('Service: Fetching all services from database');
      const services = await Service.find({ status: { $ne: 'draft' } }).sort({ order: 1, createdAt: -1 });
      console.log(`Service: Database query completed. Found ${services.length} services`);

      if (services.length === 0) {
        console.log('Service: No services found in database. Database might be empty.');
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