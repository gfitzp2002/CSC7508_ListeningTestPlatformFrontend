import axios from './AxiosConfig';

const API_URL = '/signup';

const SignUpService = {
  signUp: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}`, userData);
      console.log(response);
      return response.data; 
    } catch (error) {
      throw error;
    }
  },
};

export default SignUpService;
