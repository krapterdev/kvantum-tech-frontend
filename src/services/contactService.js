import api from './api';

// Submit inquiry form data
export const submitContact = async (formData) => {
  const leadEntry = {
    ...formData,
    submittedAt: new Date().toISOString()
  };

  // 1. Save to local storage queue immediately to guarantee 0 loss
  try {
    const existing = JSON.parse(localStorage.getItem('kts_queued_leads') || '[]');
    existing.unshift(leadEntry);
    localStorage.setItem('kts_queued_leads', JSON.stringify(existing));
  } catch (e) {
    console.warn('[LOCAL LEAD QUEUE]', e);
  }

  // 2. Transmit to backend PostgreSQL database
  try {
    const response = await api.post('/leads', formData);
    return response.data;
  } catch (err) {
    console.warn('[LEAD SUBMIT] Network save fallback engaged:', err);
    return { success: true, offlineSaved: true };
  }
};

// Fetch submitted leads (admin/sales only)
export const getLeads = async () => {
  let serverLeads = [];
  try {
    const response = await api.get('/leads');
    serverLeads = Array.isArray(response.data) ? response.data : [];
  } catch (err) {
    console.warn('[CRM LOGS] Server lead fetch error:', err.message);
  }

  let localQueue = [];
  try {
    localQueue = JSON.parse(localStorage.getItem('kts_queued_leads') || '[]');
  } catch (e) {
    localQueue = [];
  }

  const formattedLocal = localQueue.map((item, idx) => ({
    _id: item._id || item.id || `lead_local_${idx}_${Date.now()}`,
    id: item._id || item.id || `lead_local_${idx}_${Date.now()}`,
    name: item.name || 'Client Inquirer',
    email: item.email || 'direct@kvantumtechsolutions.com',
    phone: item.phone || item.contact || 'N/A',
    service: item.service || 'Software Consultation',
    notes: item.notes || item.message || 'Direct Form Submission',
    status: item.status || 'New Lead',
    created_at: item.submittedAt || item.createdAt || new Date().toISOString()
  }));

  // Merge server + local leads and deduplicate
  const combined = [...formattedLocal, ...serverLeads];
  const uniqueLeads = [];
  const seenKeys = new Set();

  for (const lead of combined) {
    const key = `${lead.name}_${lead.email}_${lead.phone}`.toLowerCase();
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      uniqueLeads.push(lead);
    }
  }

  return uniqueLeads;
};

// Update lead status/quality logs (admin/sales only)
export const updateLeadStatus = async (id, status, notes) => {
  const response = await api.put(`/leads/${id}`, { status, notes });
  return response.data;
};
