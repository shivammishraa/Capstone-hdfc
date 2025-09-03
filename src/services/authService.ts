import axiosInstance from '../utils/axiosInstance';

export const loginUser = async (name: string, password: string): Promise<string> => {
  const response = await axiosInstance.post('/auth/login', { name, password });
  return response.data.token;
};

export const validateToken = async (): Promise<boolean> => {
  try {
    await axiosInstance.get('/auth');
    return true;
  } catch {
    return false;
  }
};

export const logoutUser = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout');
  localStorage.removeItem('token');
};
