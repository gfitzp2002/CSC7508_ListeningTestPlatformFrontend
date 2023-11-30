const getQuiz = async (categoryId) => {
    const endpoint = `http://localhost:8080/api/quiz/${categoryId}`;

    try {
      const response = await fetch(endpoint); 
      if (!response.ok) {
        throw new Error('No response received');
      }
      //assign question object received from api to variable
      return await response.json();  
      
    } catch (error) {
      console.error('Error fetching question:', error);
      return null;
    }
  };
  
  export { getQuiz };
  