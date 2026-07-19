import api from './api';

export const getSettings = async () => {
  const response = await api.get('/settings');
  return response.data;
};

export const updateSetting = async (key, value) => {
  const response = await api.put(`/settings/${key}`, { value });
  return response.data;
};

export const getSeoSettings = async () => {
  const response = await api.get('/settings/seo');
  return response.data;
};

export const updateSeoSetting = async (key, data) => {
  const response = await api.put(`/settings/seo/${key}`, data);
  return response.data;
};
