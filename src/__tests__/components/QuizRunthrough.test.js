import React from 'react';
import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react';
import Quiz from '../../components/Quiz';
import { QuizContext } from '../../context/QuizContext';
import QuestionResponse from '../../models/QuestionResponse';
import { mockContextValues } from '../../mockData';
import userEvent from '@testing-library/user-event';

//stubs to override errors generated by JSDOM not supporting media playback features
window.HTMLMediaElement.prototype.load = () => { /* do nothing */ };
window.HTMLMediaElement.prototype.play = () => { /* do nothing */ };
window.HTMLMediaElement.prototype.pause = () => { /* do nothing */ };
window.HTMLMediaElement.prototype.addTextTrack = () => { /* do nothing */ };

jest.mock('react-markdown', () => {
    return function MockReactMarkdown({ children }) {
        return <div>{children}</div>;
    };
});

function renderQuiz() {
    return render(
        <QuizContext.Provider value={mockContextValues}>
            <Quiz/>
        </QuizContext.Provider>
    )
} 

describe('Simulate playing quiz', () => {
    let quizCategoryDisplay;
    let scoreboard;
    let progressBar;
    let questionComponent;
    let quizInfoModalButton;
    let answers;
  
    beforeAll(() => {
        //render quiz
        renderQuiz();
        // Find and assign each element to a variable
        quizCategoryDisplay = screen.getByTestId('quiz-category-display');
        scoreboard = screen.getByTestId('scoreboard');
        progressBar = screen.getByTestId('progress-bar');
        questionComponent = screen.getByTestId('question-component');
        quizInfoModalButton = screen.getByTestId('info-modal-button');
        answers = screen.getByTestId('answers');
    });

    afterEach(() => {
        cleanup(); // Ensuring cleanup after each test
    });

    it('renders the quiz', () => {        
        //check quiz has rendered with category name displayed
        expect(screen.getByText('Test Category 1')).toBeInTheDocument();
        // Assert progress bar displays the correct label
        expect(progressBar).toHaveTextContent('1 / 2');
        // Assert scoreboard to display zero
        expect(scoreboard).toHaveTextContent('0');
        //Assert reference audio text is displayed correctly
        expect(screen.getByText('Test reference text')).toBeInTheDocument;
        //Assert answers are rendered
        expect(answers).toHaveTextContent('Correct Answer');
        expect(answers).toHaveTextContent('Wrong Answer');
    });

    it.skip('allows the user to answer and provides feedback for incorrect answer', () => {
        //target answer buttons
        const answerButtons = answers.querySelectorAll('.list-group-item-action');

        //checking the correct list of answers have been successfully targeted  
        const buttonTexts = Array.from(answerButtons).map(button => button.textContent);
        console.log(JSON.stringify(buttonTexts));

        // Convert NodeList to an array
        const answerButtonsArray = Array.from(answerButtons);

        // Find the button with text content 'No Change'
        const noChangeButton = answerButtonsArray.find(button => button.textContent === 'Wrong Answer');

        console.log('noChangeButton - ' + noChangeButton.textContent);

        // Create an instance of QuestionResponse
        const questionResponse = new QuestionResponse(23, 'Correct Answer', 'Wrong Answer');

        // Trigger a click event on the 'No Change' button
        userEvent.click(noChangeButton);

        // Confirm that the updateQuizRecord function is called with the correct data being passed in
        const updatedMockContextValues = {
            ...mockContextValues,
            updateQuizRecord: jest.fn(), // Assuming updateQuizRecord is implemented properly in the context
        };
        
        // Confirm that the updateQuizRecord function is called with the correct data being passed in
        console.log('Update quiz record function calls:', updatedMockContextValues.updateQuizRecord.mock.calls);

        expect(updatedMockContextValues.updateQuizRecord).toHaveBeenCalledWith(questionResponse);

        const correctAnswer = updatedMockContextValues.quizData.questionSet[0].correctAnswer.answerText;
        
        // Assert the incorrect answer message is displayed
        expect(questionComponent).toHaveTextContent(`Oops! Wrong answer. The correct answer was ${correctAnswer}`);
    });
});