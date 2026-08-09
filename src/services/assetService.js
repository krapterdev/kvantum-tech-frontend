import api from './api';

// List S3 media objects (admin/seo only)
export const listAssets = async () => {
  const response = await api.get('/assets');
  return response.data;
};

// Upload file to S3 bucket (admin/seo only, with optional folder sub-directory)
export const uploadAsset = async (fileObject, folderPath = '') => {
  const formData = new FormData();
  formData.append('file', fileObject);
  if (folderPath) {
    formData.append('folder', folderPath);
  }
  
  const response = await api.post('/assets/upload', formData);
  return response.data;
};

// Delete S3 media object (admin only)
export const deleteAsset = async (name) => {
  try {
    const response = await api.post('/assets/delete', { name });
    return response.data;
  } catch (err) {
    const fallbackResponse = await api.delete(`/assets?name=${encodeURIComponent(name)}`);
    return fallbackResponse.data;
  }
};
