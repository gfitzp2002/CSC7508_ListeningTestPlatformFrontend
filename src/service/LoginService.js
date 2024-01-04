import axios from 'axios';

const API_URL = 'http://localhost:8080/api/login';

const LoginService = {
  login: async (loginData) => {
    try {
      const response = await axios.post(`${API_URL}`, loginData);
      console.log(response);
      return response.data; // Assuming the backend returns a token upon successful login
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default LoginService;
