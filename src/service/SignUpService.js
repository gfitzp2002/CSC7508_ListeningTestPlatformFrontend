import axios from './AxiosConfig';

const API_URL = '/signup';

const SignUpService = {
  login: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}`, userData);
      console.log(response);
      return response.data; 
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default LoginService;
