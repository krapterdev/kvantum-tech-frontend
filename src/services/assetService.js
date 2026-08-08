import api from './api';

// List S3 media objects (admin/seo only)
export const listAssets = async () => {
  const response = await api.get('/assets');
  return response.data;
};

// Upload file to S3 bucket (admin/seo only)
export const uploadAsset = async (fileObject) => {
  const formData = new FormData();
  formData.append('file', fileObject);
  
  const response = await api.post('/assets/upload', formData);
  return response.data;
};

// Delete S3 media object (admin only)
export const deleteAsset = async (name) => {
  const response = await api.delete(`/assets/${name}`);
  return response.data;
};
