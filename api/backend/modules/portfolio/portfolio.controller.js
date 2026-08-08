import * as portfolioService from './portfolio.service.js';

export const handleGetPortfolios = async (req, res, next) => {
  try {
    const list = await portfolioService.fetchPortfolios();
    return res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const handleCreatePortfolio = async (req, res, next) => {
  try {
    const created = await portfolioService.addPortfolio(req.body);
    return res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const handleUpdatePortfolio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await portfolioService.modifyPortfolio(id, req.body);
    return res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

export const handleDeletePortfolio = async (req, res, next) => {
  try {
    const { id } = req.params;
    await portfolioService.removePortfolio(id);
    return res.status(200).json({ message: 'Portfolio item deleted successfully.' });
  } catch (err) {
    next(err);
  }
};
