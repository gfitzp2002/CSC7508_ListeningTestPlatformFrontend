import React from 'react';
import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react';
import Quiz from '../../components/Quiz';
import { QuizContext } from '../../context/QuizContext';

  let initialContextValues = {
    categoryId: 1,
    quizData: {
      categoryId: 1,
      categoryName: 'Test Category 1',
      questionSet: [
        {
          referenceAudioFilename: 'Question 1',
          referenceAudioFiletype: '.wav',
          questionAudioFilename: 'Question 1',
          questionAudioFiletype: '.wav',
          answers: [
            {
              sourceId: 23,
              answerText: "No Change",
              categoryId: 1
            },
            {
              sourceId: 23,
              answerText: "Question 1",
              categoryId: 1
            },
          ],
          correctAnswer: {
            sourceId: 23,
            answerText: "Question 1",
            categoryId: 1
          },
          soundSource: "Test sound source",
          soundCategory: "Test sound category",
          referenceText: "Test reference text"
        }
      ],
      description: "Test description"
    },
    quizRecord: {
      calculateScore: jest.fn().mockReturnValue(10),
      calculateResults: jest.fn().mockReturnValue([])
    },
    questionIndex: 0,
    startQuiz: jest.fn(),
    isComplete: false
  };
  
//solution to Jest issue with react-markdown found on StackOverflow
jest.mock('react-markdown', () => {
  return function MockReactMarkdown({ children }) {
      return <div>{children}</div>;
  };
});


describe('Quiz Component', () => {

    afterEach(() => {
        cleanup(); // Ensuring cleanup after each test
        jest.clearAllMocks(); // Clear mock function calls
    });


    it('renders loading spinner when data is not available', () => {
        const loadingContextValues = {...initialContextValues, categoryId: null}
        render(
            <QuizContext.Provider value={loadingContextValues}>
               <Quiz/>
          </QuizContext.Provider >
    
        );
        expect(screen.getByRole('status')).toBeInTheDocument();
      });
      
       it('renders score display and result display when quiz is complete', () => {
        const resultDisplayContextValues = {...initialContextValues, isComplete: true}
        render(
          <QuizContext.Provider value={resultDisplayContextValues} >
            <Quiz/>
          </QuizContext.Provider>
        );
    
        expect(screen.getByTestId('results')).toBeInTheDocument();
        expect(screen.getByText('Play Again?')).toBeInTheDocument();
      });


    it('toggles quiz information modal', () => {
        render(
        <QuizContext.Provider value={initialContextValues}>
            <Quiz />
        </QuizContext.Provider>
        );
        fireEvent.click(screen.getByText('i'));
        expect(screen.getByText('Test description')).toBeInTheDocument();
    });

  it('renders the current question', () => {
    render(
      <QuizContext.Provider value={initialContextValues}>
        <Quiz />
      </QuizContext.Provider>
    );
    expect(screen.getByText('Question 1')).toBeInTheDocument();
  });

  it('calculates progress correctly', () => {
    render(
      <QuizContext.Provider value={{ ...initialContextValues, questionIndex: 0 }}>
        <Quiz />
      </QuizContext.Provider>
    );
    expect(screen.getByText('1 / 1')).toBeInTheDocument();
  });

  it('handles play again button click', () => {
    render(
      <QuizContext.Provider value={{ ...initialContextValues, isComplete: true }}>
        <Quiz />
      </QuizContext.Provider>
    );
    fireEvent.click(screen.getByText('Play Again?'));
    expect(initialContextValues.startQuiz).toHaveBeenCalled();
  })
})


