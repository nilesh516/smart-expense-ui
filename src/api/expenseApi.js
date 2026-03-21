import axios from 'axios';
import { APP } from '../constants/appConstants';

const BASE_URL = `${APP.API_BASE_URL}/api/expense`;

const expenseApi = {

  scanImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${BASE_URL}/scan`, formData);
    return response.data;
  },

  scanText: async (description) => {
    const response = await axios.post(`${BASE_URL}/scan-text`, { description });
    return response.data;
  },

  getAll: async () => {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  },

  getById: async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  delete: async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  }
};

export default expenseApi;