import api from './api';

export async function getProfile() {
  const response = await api.get('/me');
  console.log('PROFILE RESPONSE:', response.data);
  return response.data;
}