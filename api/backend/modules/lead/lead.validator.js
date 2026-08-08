import { ApiError } from '../../utils/ApiError.js';

export const validateLeadSubmit = (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    throw new ApiError(400, 'Missing required lead parameters (name and email are required)');
  }

  // Provide robust fallback defaults so no form submission ever fails!
  if (!req.body.service) {
    req.body.service = 'General Technical Consultation';
  }
  
  const msgContent = req.body.message || req.body.notes || req.body.requirements || '';
  req.body.message = msgContent.trim() !== '' ? msgContent : 'Requested technical consultation details';

  next();
};

export const validateLeadUpdate = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, 'Missing lead identifier parameter');
  }

  next();
};
