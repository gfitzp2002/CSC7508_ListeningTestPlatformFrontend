const getQuestion = async (id) => {
    const endpoint = `http://localhost:8080/api/question_response/${id}`;
    console.log("API Endpoint - " + endpoint);
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
  
  export { getQuestion };
  