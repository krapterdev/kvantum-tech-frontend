import { asyncHandler } from '../../utils/asyncHandler.js';
import * as serviceService from './service.service.js';
import { ApiError } from '../../utils/ApiError.js';

export const handleGetServices = asyncHandler(async (req, res) => {
  try {
    const services = await serviceService.fetchServices();
    res.status(200).json(services);
  } catch (error) {
    console.warn('[OFFLINE FALLBACK] Failed to fetch services from DB, returning empty:', error.message);
    res.status(200).json([]);
  }
});

export const handleCreateService = asyncHandler(async (req, res) => {
  const newService = await serviceService.addService(req.body);
  // Return created service directly to support CMS additions
  res.status(201).json(newService);
});

export const handleUpdateService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedService = await serviceService.editService(id, req.body);

  if (!updatedService) {
    throw new ApiError(404, 'Service node not located');
  }

  // Return updated service directly to support CMS updates
  res.status(200).json(updatedService);
});

export const handleDeleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedService = await serviceService.removeService(id);

  if (!deletedService) {
    throw new ApiError(404, 'Service node not located');
  }

  // Return success state directly to support CMS deletions
  res.status(200).json({ success: true });
});

export const handleReorderServices = asyncHandler(async (req, res) => {
  const { orderedIds } = req.body;
  const updatedList = await serviceService.reorderServices(orderedIds);
  res.status(200).json(updatedList || []);
});
