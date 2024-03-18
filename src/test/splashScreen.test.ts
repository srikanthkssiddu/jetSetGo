import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SplashScreen from '../pages/splashScreen' 

describe('SplashScreen Component', () => {
  test('renders correctly', async () => {
    const { getByText, getByPlaceholderText } = render(<SplashScreen />);

    const appTitle = getByText('jetSetGo');
    expect(appTitle).toBeDefined();

    const whereFromInput = getByPlaceholderText('Where From');
    const whereToInput = getByPlaceholderText('Where To');
    expect(whereFromInput).toBeDefined();
    expect(whereToInput).toBeDefined();
  });

  test('disables button when inputs are empty', async () => {
    const { getByText, getByPlaceholderText } = render(<SplashScreen />);

    const searchButton = getByText('Search results');
    expect(searchButton).toBeDisabled();

    const whereFromInput = getByPlaceholderText('Where From');
    const whereToInput = getByPlaceholderText('Where To');
    fireEvent.changeText(whereFromInput, 'Mumbai');
    fireEvent.changeText(whereToInput, 'Delhi');
    expect(searchButton).toBeEnabled();
  });

  test('calls onGetStarted when search button is pressed', async () => {
    const mockOnGetStarted = jest.fn();
    const { getByText, getByPlaceholderText } = render(<SplashScreen onGetStarted={mockOnGetStarted} />);

    const whereFromInput = getByPlaceholderText('Where From');
    const whereToInput = getByPlaceholderText('Where To');
    fireEvent.changeText(whereFromInput, 'Mumbai');
    fireEvent.changeText(whereToInput, 'Delhi');

    const searchButton = getByText('Search results');
    fireEvent.press(searchButton);

    expect(mockOnGetStarted).toHaveBeenCalled();
  });

  // Add more test cases as needed

});
