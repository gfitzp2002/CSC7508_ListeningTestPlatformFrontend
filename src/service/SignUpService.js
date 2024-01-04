import axios from 'axios';

const API_URL = 'http://localhost:8080/api/signup';

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
