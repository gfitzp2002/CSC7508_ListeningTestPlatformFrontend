import axios from './AxiosConfig';

const QUIZ_URL = '/quiz';
const CATEGORY_URL = 'quiz/categories';
const QUIZ_RECORD_URL = 'quiz/store';

const getQuiz = async (categoryId) => {
  console.log('getQuiz() called....');
  try {
    // Use query parameter to pass categoryId
    const response = await axios.get(`${QUIZ_URL}`, {
      params: {
        categoryId: categoryId
      }
    });
    //console.log("getQuiz called: " + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error('Error fetching question:', error.message);
    return null;
  }
};

const getCategories = async () => {
  try {
    const response = await axios.get(`${CATEGORY_URL}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    return null;
  }
};

  // Function to store QuizRecord on the server
const  storeQuizRecord = async (quizRecord) => {
    try {
      const response = await axios.post(`${QUIZ_RECORD_URL}`, quizRecord);
      return response.data;
    } catch (error) {
      console.error('Error storing QuizRecord:', error);
      throw error; // Re-throw the error to handle it in the caller
    }
  };

export { getQuiz, getCategories, storeQuizRecord };
