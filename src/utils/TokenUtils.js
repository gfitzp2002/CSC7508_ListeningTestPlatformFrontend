
import axios from '../service/AxiosConfig';

const API_URL = '/token-refresh';

export const refreshToken = async () => {
    try {
    const token = localStorage.getItem('userToken');
    const response = await axios.post(`${API_URL}`, { userToken: token });
    console.log("Refresh token response: " + token);
    return response.data; 

    } catch (error) {
    throw new Error ('Failed to refresh token');
    }
    
};

//Utility function to check if token has expired or is close to expiring
export const tokenExpiryCheck = () => {
    console.log("Token expiry check running..")
    const expiryTimestamp = localStorage.getItem('tokenExpiry');
    
    if (!expiryTimestamp) return false;

    // Convert expiryTimestamp string to integer
    const expiry = new Date(parseInt(expiryTimestamp, 10)); 
    console.log("Current token expiry: " + expiry);
    const now = new Date();

    // Set the time threshold - 5 minute
    const threshold = 3 * 60 * 1000; // 5 minutes in milliseconds
    const result = now.getTime() + threshold >= expiry.getTime();
    // Check if the current time is within the threshold of the expiry time
    console.log("token expiry check result: " + result);
    return result;
};


export const startTokenRefreshTimer = (onFail) => {
    console.log("Token refresh timer started");
    // Call refresh at regular intervals
    const refreshInterval = 0.5 * 60 * 1000; // 1 minute in milliseconds
  
    const intervalId = setInterval(async () => {

        if (tokenExpiryCheck()) {
            try {
                const response = await refreshToken();
                if (response.token && response.expiry) {
                    localStorage.setItem('userToken', response.token);
                    localStorage.setItem('tokenExpiry', response.expiry);
                }
            } catch (error) {
                console.error('Error refreshing token:', error);
                if (typeof onFail === 'function') {
                    //Allow the logout function of Authcontext to be passed in
                    onFail();
                }
            }
        }
    }, refreshInterval);
  
    return intervalId;
  };
  
  export const stopTokenRefreshTimer = (intervalId) => {
    clearInterval(intervalId);
  }; 