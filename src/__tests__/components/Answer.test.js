import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Answer from '../../components/Answer';
import { QuizContext } from '../../context/QuizContext';
import { mockContextValues } from '../../mockData';

// Mock function component's functions
const onSubmission = jest.fn(); 

//Utility function to render component and reduce duplication across unit tests
function renderComponent(contextValues, questionIndex) {
    return render(
        <QuizContext.Provider value={contextValues}>
            <Answer 
                answers={contextValues.quizData.questionSet[questionIndex].answers} 
                correctAnswer={contextValues.quizData.questionSet[questionIndex].correctAnswer} 
                onSubmission={onSubmission} 
                sourceName={mockContextValues.quizData.questionSet[questionIndex].soundSource} 
            />
        </QuizContext.Provider>
    )
} 

describe('Answer component', () => {

  it('correctly renders list of answers', () => {     
    //render
    renderComponent(mockContextValues, 0);
    //Get the answers array from the props
    const { answers } = mockContextValues.quizData.questionSet[0];
    // Check if all answer options are rendered
    answers.forEach(answer => {
    expect(screen.getByText(answer.answerText)).toBeInTheDocument();
    });
  });

  it('displays the correct instruction for category 1', () => {
    renderComponent(mockContextValues, 0);
    //target header element that displays the answer instruction
    const answerInstruction = screen.getByTestId('answer-instruction');
    //Assert first question data should result in Answer instruction: "Name that frequency!"
  
    expect(answerInstruction).toHaveTextContent("Name that frequency!");

  });
  it('displays the correct instruction for category 3', () => {
    //change category of mockData
    const updatedMockContextValues = {...mockContextValues, categoryId: 3};
    //render with next question data - should display "Identify the sound source to which the level difference has been applied"
    renderComponent(updatedMockContextValues, 0);
    //target header element that displays the answer instruction
    const answerInstruction = screen.getByTestId('answer-instruction'); 
    expect(answerInstruction).toHaveTextContent("Can you identify the dB change?");

  });

  it('displays the correct instruction for category 3 with sound source - mix sources 8dB changes', () => {
    //change category of mockData
    const updatedMockContextValues = {...mockContextValues, categoryId: 3};
    //render with next question data - should display "Identify the sound source to which the level difference has been applied"
    renderComponent(updatedMockContextValues, 1);
    //target header element that displays the answer instruction
    const answerInstruction = screen.getByTestId('answer-instruction');     
    expect(answerInstruction).toHaveTextContent("Identify the sound source to which the level difference has been applied");

  });

  it('handles submission correctly - isCorrect value for correct and incorrect answer', () => {
    //render component with first question
    renderComponent(mockContextValues, 0);
    
    
    // Select a correct answer
    fireEvent.click(screen.getByText('Correct Answer'));
    expect(onSubmission).toHaveBeenCalledWith('Correct Answer');

    // Select an incorrect answer
    fireEvent.click(screen.getByText('Wrong Answer'));
    expect(onSubmission).toHaveBeenCalledWith('Wrong Answer');
    
  });

  it('handles submission correctly - calling handleAnimation', async () => {

    const handleAnimation = jest.fn();
    //render component with first question
    renderComponent(mockContextValues, 0);
    
    // Select a correct answer
    fireEvent.click(screen.getByText('Correct Answer'));
     
    await waitFor(() => 
        expect(handleAnimation).toHaveBeenCalledWith(true)
    );

    // Select an incorrect answer
    fireEvent.click(screen.getByText('Wrong Answer'));
    await waitFor(() => 
     expect(handleAnimation).toHaveBeenCalledWith(false)
    );
    
  });

  it.skip('displays EarAnimation when an answer is submitted', () => {
    render(<Answer answers={answers} correctAnswer={correctAnswer} onSubmission={onSubmission} sourceName={sourceName} categoryId={categoryId} />);
    
    // Select an answer to trigger animation
    fireEvent.click(screen.getByText('Answer 1'));
    
    // Assert that EarAnimation component is displayed
    expect(screen.getByTestId('ear-animation')).toBeInTheDocument();
  });
});
