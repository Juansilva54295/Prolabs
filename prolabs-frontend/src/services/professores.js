import api from './api';

export const getProfessores = async () => {
  const response = await api.get('/professores');
  return response.data;
};