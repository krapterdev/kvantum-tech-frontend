import api from './api';

// Submit inquiry form data
export const submitContact = async (formData) => {
  const response = await api.post('/leads', formData);
  return response.data;
};

// Fetch submitted leads (admin/sales only)
export const getLeads = async () => {
  const response = await api.get('/leads');
  return response.data;
};

// Update lead status/quality logs (admin/sales only)
export const updateLeadStatus = async (id, status, notes) => {
  const response = await api.put(`/leads/${id}`, { status, notes });
  return response.data;
};
