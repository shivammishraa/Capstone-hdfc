import axiosInstance from '../utils/axiosInstance';

// export const loginUser = async (username: string, password: string): Promise<string> => {
//   const response = await axiosInstance.post('/auth/login', { username, password });
//   console.log("The response", response)
//   return response.data.token;
// };

// services/authService.ts


export const loginUser = async (username: string, password: string) => {
  try {
    const res = await axiosInstance.post("/auth/login", {
      username,
      password,
    });

    return res.data; // contains token, message
  } catch (error: any) {
    if (error.response) {
      throw {
        status: error.response.status,
        message: error.response.data?.message || "Something went wrong",
      };
    }
    throw { status: 500, message: "Server not reachable" };
  }
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
