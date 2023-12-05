import axios from 'axios';

const API_URL = 'http://localhost:8080/api/quiz';

const getQuiz = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/${categoryId}`);

    // Axios automatically throws an error for non-2xx responses, so no need for explicit error checking
    return response.data;
  } catch (error) {
    console.error('Error fetching question:', error.message);
    return null;
  }
};

export { getQuiz };
