import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lookee.nwhco.ir/aapi',
});

export const fetchBarbers = async (params: any, signal?: AbortSignal) => {
  try {
    const response = await api.get('/barbers', { params, signal });
    return response.data;
  } catch (error) {
    console.error('Error fetching barbers:', error);
    throw error;
  }
};

export default api;