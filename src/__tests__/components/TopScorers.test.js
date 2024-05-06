import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import TopScorers from '../../components/TopScorers';
import { getTopScorersData } from '../../service/AdminService';
import { getCategories } from '../../service/QuizService';


jest.mock('../../service/AdminService');
jest.mock('../../service/QuizService');

describe('TopScorers Component', () => {
  const mockTopScorersData = [
    { username: 'user1', categoryId: 1, category: 'Test Category 1',  score: 16, submittedDateTime: new Date().toISOString() },
    { username: 'user2', categoryId: 1, category: 'Test Category 1', score: 13, submittedDateTime: new Date().toISOString() },
    { username: 'user3', categoryId: 1, category: 'Test Category 1', score: 14, submittedDateTime: new Date().toISOString() },
    { username: 'user4', categoryId: 2, category: 'Test Category 2', score: 14, submittedDateTime: new Date().toISOString() },
    { username: 'user5', categoryId: 2, category: 'Test Category 2', score: 19, submittedDateTime: new Date().toISOString() },
    { username: 'user6', categoryId: 2, category: 'Test Category 2', score: 17, submittedDateTime: new Date().toISOString() },
  ];

  const mockCategories = [
    { categoryId: 1, categoryName: 'Test Category 1' },
    { categoryId: 2, categoryName: 'Test Category 2' },
  ];

  beforeEach(() => {
    getTopScorersData.mockResolvedValue(mockTopScorersData);
    getCategories.mockResolvedValue(mockCategories);
  });

  it('renders loading state initially', async () => {
    render(<TopScorers />);
    expect(screen.getByText('Loading.....')).toBeInTheDocument();
    await waitFor(() => {});
  });

  it('renders categories dropdown after loading', async () => {
    render(<TopScorers />);
    //wait until component has rendered
    await waitFor(() => screen.getByTestId('topscorers'));
    fireEvent.click(screen.getByText('Select a Quiz Category'));

    expect(screen.getByText('Test Category 1')).toBeInTheDocument();
    expect(screen.getByText('Test Category 2')).toBeInTheDocument();
  });

  it('renders top scorers table when a category is selected', async () => {
    render(<TopScorers />);
    await waitFor(() => screen.getByTestId('topscorers'));
    // Click on the dropdown button
    fireEvent.click(screen.getByText('Select a Quiz Category'));

    // Click on the dropdown item to select it
    const categorySelections = screen.getAllByTestId('quiz-category');
    let categorySelection = categorySelections[0];
    fireEvent.click(categorySelection);

    // Wait for the component to update after selecting the category
    await waitFor(() => {})

    //check the data for relevant users is rendered
    expect(screen.getByText(/top scorers for/i)).toBeInTheDocument();
    expect(screen.getByText(/user1/i)).toBeInTheDocument();
    expect(screen.getByText(/user2/i)).toBeInTheDocument();
    expect(screen.getByText(/user3/i)).toBeInTheDocument();

    //change to 2nd category
    categorySelection = categorySelections[1];
    fireEvent.click(categorySelection);

    // Wait for the component to update after selecting the category
    await waitFor(() => {})

    //check the data for relevant users is rendered
    expect(screen.getByText(/top scorers for/i)).toBeInTheDocument();
    expect(screen.getByText(/user4/i)).toBeInTheDocument();
    expect(screen.getByText(/user4/i)).toBeInTheDocument();
    expect(screen.getByText(/user6/i)).toBeInTheDocument();

  });

  it('handles errors', async () => {
    getCategories.mockRejectedValueOnce(new Error('Categories fetching failed'));
    render(<TopScorers />);
    await waitFor(() => screen.getByTestId('error-message'));
    expect(screen.getByText(/an error occurred while fetching data/i)).toBeInTheDocument();
  });

  it('renders permission error message when a 403 status is returned', async () => {
    getCategories.mockRejectedValueOnce({ response: { status: 403 } });
    render(<TopScorers />);
    await waitFor(() => screen.getByTestId('error-message'));
    expect(screen.getByText(/you do not have the permissions/i)).toBeInTheDocument();
  });
  
});
