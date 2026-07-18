import api from './api';

// Subscribe email to newsletter updates
export const subscribeNewsletter = async (email) => {
  const response = await api.post('/newsletter', { email });
  return response.data;
};
