import api from './api';

export const getAlunos = async () => {
  const response = await api.get('/api/alunos');
  return response.data;
};

export const getAlunoById = async (id) => {
  const response = await api.get(`/api/alunos/${id}`);
  return response.data;
};

export const createAluno = async (data) => {
  const response = await api.post('/api/alunos', data);
  return response.data;
};

export const updateAluno = async (id, data) => {
  const response = await api.put(`/api/alunos/${id}`, data);
  return response.data;
};

export const deleteAluno = async (id) => {
  const response = await api.delete(`/api/alunos/${id}`);
  return response.data;
};