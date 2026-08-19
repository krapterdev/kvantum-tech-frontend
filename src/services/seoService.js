import api from './api';

// Fetch all programmatic SEO pages
export const getAllSeoPages = async () => {
  const response = await api.get('/seopages');
  return response.data;
};

// Create a new SEO landing page (admin/seo only)
export const createSeoPage = async (pageData) => {
  const response = await api.post('/seopages', pageData);
  return response.data;
};

// Bulk upload SEO landing pages (admin/seo only)
export const bulkUploadSeoPages = async (pagesArray) => {
  const response = await api.post('/seopages/bulk', { pages: pagesArray });
  return response.data;
};

// Update an existing SEO landing page (admin/seo only)
export const updateSeoPage = async (slug, pageData) => {
  const response = await api.put(`/seopages/${slug}`, pageData);
  return response.data;
};

// Delete an SEO landing page (admin/seo only)
export const deleteSeoPage = async (slug) => {
  const response = await api.delete(`/seopages/${slug}`);
  return response.data;
};

// Fetch all general SEO settings (robots, sitemap, page meta configurations)
export const getSeoSettings = async () => {
  const response = await api.get('/seopages/settings');
  return response.data;
};

// Fetch specific SEO setting key
export const getSeoSettingByKey = async (key) => {
  const response = await api.get(`/seopages/settings/${key}`);
  return response.data;
};

// Update/create SEO settings (admin/seo only)
export const updateSeoSetting = async (key, settingData) => {
  const response = await api.put(`/seopages/settings/${key}`, settingData);
  return response.data;
};
