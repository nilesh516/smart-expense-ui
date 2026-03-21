import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/auth';

const authApi = {

  login: async (email, password) => {
    const res = await axios.post(`${BASE_URL}/login`, { email, password });
    return res.data;
  },

  register: async (name, email, password) => {
    const res = await axios.post(`${BASE_URL}/register`, { name, email, password });
    return res.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export default authApi;