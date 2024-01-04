import axios from 'axios';

const QUIZ_URL = 'http://localhost:8080/api/quiz';
const CATEGORY_URL = 'http://localhost:8080/api/quiz/categories';

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
