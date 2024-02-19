import axios from './AxiosConfig';

//ENDPOINTS

//Both return an array loginHistory objects with username, loginTimestamp and success values.
//Inactive users endpoint will prove the last successful loginTimestamp of any user, returning all where this value is over a week old.
const LOGIN_HISTORY_URL = '/user-login-history';
const INACTIVE_USERS = './inactive_users';

//Returns an array of login stat objects with the parameters: {username, month, year, daysLogged}
const LOGIN_STATS = './login_stats';

//Returns the specified number of top scores for each quiz with each object  - {username, categoryId, category, score, submittedDateTime}
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

  const calculateDaysSinceLastLogin = (loginHistory) => {
    if (loginHistory.length > 0) {
        console.log('calculateDaysSinceLastLogin() called.  Login History Object: ' + JSON.stringify(loginHistory));
        const latestLoginTimestamp = loginHistory[loginHistory.length - 1].loginTimestamp;
        const millisecondsSinceLastLogin = Date.now() - latestLoginTimestamp;
        return Math.floor(millisecondsSinceLastLogin / (1000 * 60 * 60 * 24));
    } else {
        return null;
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

  export { getLoginHistory, getInactiveUsers, getLoginStats, getLeadersBoardData, calculateDaysSinceLastLogin };