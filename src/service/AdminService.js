import axios from './AxiosConfig';


const LOGIN_HISTORY_URL = '/user-login-history';
const INACTIVE_USERS = './inactive-users';
const LOGIN_STATS = './login_stats';
const LEADER_BOARDS = './leader_boards';

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

  const getInactiveUsers = async () => {
    try {
        const response = await axios.get(`${INACTIVE_USERS}`);  
         console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching inactive users:', error.message);
        console.log('Error', error);
        throw error;
    }
  };

  const getLoginStats = async () => {
    try {
        const response = await axios.get(`${LOGIN_STATS}`);  
         console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching login stats!', error.message);
        console.log('Error', error);
        throw error;
    }
  };

  const getLeadersBoardData = async (maxResults) => {
    try {
        const response = await axios.get(`${LEADER_BOARDS}`, {
            params: {
            maxResults: maxResults
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching leader board data', error.message);
        console.log('Error', error);
        throw error;
    }

  };

  export { getLoginHistory, getInactiveUsers, getLoginStats, getLeadersBoardData };