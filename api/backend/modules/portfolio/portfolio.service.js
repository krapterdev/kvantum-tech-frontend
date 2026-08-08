import * as portfolioRepository from './portfolio.repository.js';

export const fetchPortfolios = async () => {
  return await portfolioRepository.getPortfolios();
};

export const addPortfolio = async (data) => {
  return await portfolioRepository.createPortfolio(data);
};

export const modifyPortfolio = async (id, data) => {
  return await portfolioRepository.updatePortfolioById(id, data);
};

export const removePortfolio = async (id) => {
  return await portfolioRepository.deletePortfolioById(id);
};
