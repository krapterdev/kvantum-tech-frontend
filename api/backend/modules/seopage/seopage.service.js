import * as seoPageRepository from './seopage.repository.js';

export const addSeoPage = async (pageData) => {
  return await seoPageRepository.createSeoPage(pageData);
};

export const addBulkSeoPages = async (pages) => {
  return await seoPageRepository.createBulkSeoPages(pages);
};

export const fetchSeoPages = async () => {
  return await seoPageRepository.getAllSeoPages();
};

export const editSeoPage = async (slug, pageData) => {
  return await seoPageRepository.updateSeoPageBySlug(slug, pageData);
};

export const removeSeoPage = async (slug) => {
  return await seoPageRepository.deleteSeoPageBySlug(slug);
};
