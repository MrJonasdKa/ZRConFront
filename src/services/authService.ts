import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};

export const register = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`);
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('logout'));
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
