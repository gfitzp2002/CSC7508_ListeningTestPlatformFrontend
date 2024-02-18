
class QuizRecord {
    constructor(username, categoryId) {
      this.username = username;
      this.categoryId = categoryId;
      this.score = 0;
      this.questions = [];
    }
  
    addResponse(questionResponse) {
      this.questions.push(questionResponse);
    }
  
    calculateScore() {
      // Calculate the score based on the responses    
      let score = 0;
      for (const question of this.questions) {
        if (question.isCorrect()) {
          score++;
        }
      }
      return score;
    }

    calculateResults() {
      // Calculate the results based on the responses    
      return this.questions.map(question => question.isCorrect());
    }
  
    
  }
  
  export default QuizRecord; 