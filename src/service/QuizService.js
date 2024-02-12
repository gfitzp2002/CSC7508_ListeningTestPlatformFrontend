import axios from './AxiosConfig';

const QUIZ_URL = '/quiz';
const CATEGORY_URL = 'quiz/categories';

const getQuiz = async (categoryId) => {
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

export { getQuiz, getCategories };
