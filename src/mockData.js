import QuizRecord from "./models/QuizRecord";

export const mockContextValues = {

    categoryId: 1,
    quizData: {
      categoryId: 1,
      categoryName: 'Test Category 1',
      questionSet: [
        {
          referenceAudioFilename: 'Reference_1',
          referenceAudioFiletype: '.wav',
          questionAudioFilename: 'Question_1',
          questionAudioFiletype: '.wav',
          answers: [
            {
              sourceId: 23,
              answerText: "Wrong Answer",
              categoryId: 1
            },
            {
              sourceId: 23,
              answerText: "Correct Answer",
              categoryId: 1
            },
          ],
          correctAnswer: {
            sourceId: 23,
            answerText: "Correct Answer",
            categoryId: 1
          },
          soundSource: "Sine Wave",
          soundCategory: "Sine Tones",
          referenceText: "Test reference text"
        },
        {
        referenceAudioFilename: 'Reference_2',
        referenceAudioFiletype: '.wav',
        questionAudioFilename: 'Question_2',
        questionAudioFiletype: '.wav',
        answers: [
            {
            sourceId: 23,
            answerText: "Wrong Answer",
            categoryId: 1
            },
            {
            sourceId: 23,
            answerText: "Correct Answer",
            categoryId: 1
            },
        ],
        correctAnswer: {
            sourceId: 23,
            answerText: "Correct Answer",
            categoryId: 1
        },
        soundSource: "mix sources 8dB changes",
        soundCategory: "Track Mix 1 +8dB",
        referenceText: "Test reference text 2!"
        }
      ],
      description: "Test description"
    },
    quizRecord: new QuizRecord("TestUser", 1, 0, []),
    questionIndex: 0,
    startQuiz: jest.fn(),
    isComplete: false
};
  