import axios from './AxiosConfig';


const LOGIN_HISTORY_URL = '/user-login-history';

const getLoginHistory = async (username) => {
    try {
        const response = await axios.get(`${LOGIN_HISTORY_URL}`, {
            params: {
            username: username
            }
         });  
         console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching login history:', error.message);
        console.log('Error', error);
        throw error;
    }
  };

  export { getLoginHistory };