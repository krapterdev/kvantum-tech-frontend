import { asyncHandler } from '../../utils/asyncHandler.js';
import * as blogService from './blog.service.js';
import { ApiError } from '../../utils/ApiError.js';

export const handleGetBlogs = asyncHandler(async (req, res) => {
  const blogs = await blogService.fetchBlogs();
  // Return plain array directly to support blogs listing setBlogs(data) state
  res.status(200).json(blogs);
});

export const handleCreateBlog = asyncHandler(async (req, res) => {
  const newBlog = await blogService.addBlog(req.body);
  // Return created blog directly to support CMS additions
  res.status(201).json(newBlog);
});

export const handleUpdateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedBlog = await blogService.editBlog(id, req.body);

  if (!updatedBlog) {
    throw new ApiError(404, 'Blog document not located');
  }

  // Return updated blog directly to support CMS updates
  res.status(200).json(updatedBlog);
});

export const handleDeleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedBlog = await blogService.removeBlog(id);

  if (!deletedBlog) {
    throw new ApiError(404, 'Blog document not located');
  }

  // Return success state directly to support CMS deletions
  res.status(200).json({ success: true });
});
