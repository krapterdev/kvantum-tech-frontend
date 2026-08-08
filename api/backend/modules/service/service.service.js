import * as serviceRepository from './service.repository.js';

export const addService = async (serviceData) => {
  return await serviceRepository.createService(serviceData);
};

export const fetchServices = async () => {
  return await serviceRepository.getAllServices();
};

export const editService = async (id, serviceData) => {
  return await serviceRepository.updateServiceById(id, serviceData);
};

export const removeService = async (id) => {
  return await serviceRepository.deleteServiceById(id);
};

export const reorderServices = async (orderedIds) => {
  return await serviceRepository.reorderServices(orderedIds);
};
