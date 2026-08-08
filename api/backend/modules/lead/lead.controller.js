import { asyncHandler } from '../../utils/asyncHandler.js';
import * as leadService from './lead.service.js';
import { ApiError } from '../../utils/ApiError.js';

export const handleLeadSubmit = asyncHandler(async (req, res) => {
  const newLead = await leadService.submitLead(req.body);
  // Return lead object directly to support visitor form submission response handler
  res.status(201).json(newLead);
});

export const handleGetLeads = asyncHandler(async (req, res) => {
  const leads = await leadService.fetchLeads();
  // Return leads array directly to support admin dashboard setLeads(data) state
  res.status(200).json(leads);
});

export const handleUpdateLead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedLead = await leadService.updateLeadDetails(id, req.body);
  
  if (!updatedLead) {
    throw new ApiError(404, 'Lead node not located');
  }

  // Return updated lead directly to support admin CRM state refresh
  res.status(200).json(updatedLead);
});
