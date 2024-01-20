import axios from './AxiosConfig';

const QUIZ_URL = '/quiz';
const CATEGORY_URL = 'quiz/categories';

const getQuiz = async (categoryId) => {
  try {
    const response = await axios.get(`${QUIZ_URL}/${categoryId}`);

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
