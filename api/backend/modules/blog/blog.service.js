import * as blogRepository from './blog.repository.js';

export const addBlog = async (blogData) => {
  return await blogRepository.createBlog(blogData);
};

export const fetchBlogs = async () => {
  return await blogRepository.getAllBlogs();
};

export const editBlog = async (id, blogData) => {
  return await blogRepository.updateBlogById(id, blogData);
};

export const removeBlog = async (id) => {
  return await blogRepository.deleteBlogById(id);
};
