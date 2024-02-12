class QuestionResponse {
    constructor(soundSourceId, correctAnswer, submittedAnswer) {
      this.soundSourceId = soundSourceId;
      this.correctAnswer = correctAnswer;
      this.submittedAnswer = submittedAnswer;
    }


    isCorrect() {
        return this.correctAnswer === this.submittedAnswer;
      }

  }
  
  export default QuestionResponse;