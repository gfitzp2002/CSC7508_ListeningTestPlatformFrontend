import axios from './AxiosConfig';

const API_URL = '/login';

const LoginService = {
  login: async (loginData) => {
    try {
      const response = await axios.post(`${API_URL}`, loginData);
      console.log(response);
      return response.data; 
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default LoginService;
