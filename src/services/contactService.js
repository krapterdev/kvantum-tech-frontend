import api from './api';

export const submitContact = async (formData) => {
  try {
    const response = await api.post('/leads', formData);
    return response.data;
  } catch (err) {
    console.warn('[LEAD SUBMIT] Primary backend offline, backing up lead to local browser queue:', err);
    try {
      const existing = JSON.parse(localStorage.getItem('kts_queued_leads') || '[]');
      existing.push({ ...formData, submittedAt: new Date().toISOString() });
      localStorage.setItem('kts_queued_leads', JSON.stringify(existing));
    } catch (e) {
      // ignore
    }
    return { success: true, offlineSaved: true };
  }
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
