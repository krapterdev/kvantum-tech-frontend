import api from './api';

// Fetch all blogs
export const getAllBlogs = async () => {
  const response = await api.get('/blogs');
  return response.data;
};

// Create a new blog post (admin/seo only)
export const createBlog = async (blogData) => {
  const response = await api.post('/blogs', blogData);
  return response.data;
};

// Update an existing blog post (admin/seo only)
export const updateBlog = async (id, blogData) => {
  const response = await api.put(`/blogs/${id}`, blogData);
  return response.data;
};

// Delete a blog post (admin/seo only)
export const deleteBlog = async (id) => {
  const response = await api.delete(`/blogs/${id}`);
  return response.data;
};
