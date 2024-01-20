
import axios from '../service/AxiosConfig';

const API_URL = '/token-refresh';

export const refreshToken = async () => {
    try {
    const token = localStorage.getItem('userToken');
    const response = await axios.post(`${API_URL}`, { userToken: token });
    console.log(response);
    return response.data; 

    } catch (error) {
    throw new Error ('Failed to refresh token');
    }
    
};

//Utility function to check if token has expired or is close to expiring
export const tokenExpiryCheck = () => {
    const expiryTimestamp = localStorage.getItem('tokenExpiry');
    if (!expiryTimestamp) return false;

    // Convert expiryTimestamp string to integer
    const expiry = new Date(parseInt(expiryTimestamp, 10)); 
    const now = new Date();

    // Set the time threshold - 10 minutes
    const threshold = 10 * 60 * 1000; // 10 minutes in milliseconds

    // Check if the current time is within the threshold of the expiry time
    return now.getTime() + threshold >= expiry.getTime();
};


export const startTokenRefreshTimer = () => {
    // Call refresh at regular intervals, e.g., every 5 minutes
    const refreshInterval = 5 * 60 * 1000; // 5 minutes in milliseconds
  
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
            //Set up redirect?
        }
    }
    }, refreshInterval);
  
    return intervalId;
  };
  
  export const stopTokenRefreshTimer = (intervalId) => {
    clearInterval(intervalId);
  }; 