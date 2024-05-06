import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Question from '../../components/Question';
import { QuizContext } from '../../context/QuizContext';
import QuestionResponse from '../../models/QuestionResponse';
import AudioPlayer from '../../components/AudioPlayer';

//Mock question data
let questionData = {
  referenceAudioFilename: 'Reference 1',
  referenceAudioFiletype: '.wav',
  questionAudioFilename: 'Question 1',
  questionAudioFiletype: '.wav',
  answers: [
    { sourceId: 23, answerText: "No Change", categoryId: 1 },
    { sourceId: 23, answerText: "Answer 1", categoryId: 1 },
  ],
  correctAnswer: { sourceId: 23, answerText: "Answer 1", categoryId: 1 },
  soundSource: "Test sound source",
  soundCategory: "Test sound category",
  referenceText: "Test reference text"
};

let contextData = {
  updateQuizRecord: jest.fn()
} 

const togglePlay = jest.fn();

describe('Question Component', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state when question data is not available (null)', () => {
    render(
    <QuizContext.Provider value={contextData}>
      <Question questionData={null}/>
      </QuizContext.Provider>
    );
    expect(screen.getByText('Loading......')).toBeInTheDocument();
  });

  it('renders question correctly', () => {
    render(
      <QuizContext.Provider value={contextData}>
        <Question questionData={questionData} />
      </QuizContext.Provider>
    );
    //check that reference audio information is rendered
    expect(screen.getByText(/Test sound source/i)).toBeInTheDocument();
    expect(screen.getByText('Test reference text')).toBeInTheDocument();
    //check the possible answers are rendered
    expect(screen.getByText('No Change')).toBeInTheDocument();
    expect(screen.getByText('Answer 1')).toBeInTheDocument();
  });

  it('handles submission correctly', () => {
    render(
      <QuizContext.Provider value={contextData}>
        <Question questionData={questionData} />
      </QuizContext.Provider>
    );

    // Create an instance of QuestionResponse
    const questionResponse = new QuestionResponse(23, 'Answer 1', 'No Change');

    //click on wrong answer 'No Change'
    fireEvent.click(screen.getByText('No Change'));

    //confirm updateQuizRecord is called with the correct data being passed in
    expect(contextData.updateQuizRecord).toHaveBeenCalledWith(questionResponse);

    // Expect the correct feedback message to be displayed
    expect(screen.getByText('Oops! Wrong answer. The correct answer was Answer 1')).toBeInTheDocument();
  });

  it('calls togglePlay method when clicked', () => {
    const audioFilename = 'test-audio.wav';
    const isPlaying = false;
  
    render(
      <AudioPlayer
        audioFilename={audioFilename}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
      />
    );
  
    const playButton = screen.getByText(/listen/i);
    fireEvent.click(playButton);
  
    expect(togglePlay).toHaveBeenCalledWith(audioFilename);
  });
  
});
