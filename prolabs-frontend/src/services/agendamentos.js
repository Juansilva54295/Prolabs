import api from './api';

export const getAgendamentos = async (params = {}) => {
  const response = await api.get('/agendamentos', { params });
  return response.data;
};

export const getAgendamentoById = async (id) => {
  const response = await api.get(`/agendamentos/${id}`);
  return response.data;
};

export const createAgendamento = async (data) => {
  const response = await api.post('/agendamentos', data);
  return response.data;
};

export const updateAgendamento = async (id, data) => {
  const response = await api.put(`/agendamentos/${id}`, data);
  return response.data;
};

export const deleteAgendamento = async (id) => {
  const response = await api.delete(`/agendamentos/${id}`);
  return response.data;
};