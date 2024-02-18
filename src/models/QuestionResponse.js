class QuestionResponse {
    constructor(sourceId, correctAnswer, submittedAnswer) {
      this.sourceId = sourceId;
      this.correctAnswer = correctAnswer;
      this.submittedAnswer = submittedAnswer;
    }


    isCorrect() {
        return this.correctAnswer === this.submittedAnswer;
      }

  }
  
  export default QuestionResponse;