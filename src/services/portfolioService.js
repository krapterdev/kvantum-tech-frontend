import api from './api';

export const getAllPortfolios = async () => {
  const response = await api.get('/portfolios');
  return response.data;
};

export const createPortfolio = async (data) => {
  const response = await api.post('/portfolios', data);
  return response.data;
};

export const updatePortfolio = async (id, data) => {
  const response = await api.put(`/portfolios/${id}`, data);
  return response.data;
};

export const deletePortfolio = async (id) => {
  const response = await api.delete(`/portfolios/${id}`);
  return response.data;
};
