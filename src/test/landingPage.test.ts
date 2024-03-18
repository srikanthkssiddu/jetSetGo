import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LandingPage from '../pages/landingPage';
import { FlightData } from '../pages/landingPageController';

const flightData1 : FlightData ={
    "id": 4,
"gate": "D2",
"price": 4500,
"origin": "Mumbai",
"airline": "Vistara",
"aircraft": "Airbus A320",
"duration": "2 hours 30 minutes",
"arrivalTime": "2024-03-15T13:30:00",
"destination": "Bangalore",
"flightNumber": "UK404",
"departureTime": "2024-03-15T11:00:00",
"seatsAvailable": 110
}

describe('LandingPage Component', () => {
  test('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<LandingPage />);

    const appTitle = getByText('jetSetGo');
    expect(appTitle).toBeDefined();

    const whereFromInput = getByPlaceholderText('Where From');
    const whereToInput = getByPlaceholderText('Where To');
    expect(whereFromInput).toBeDefined();
    expect(whereToInput).toBeDefined();
  });

  test('opens details modal correctly', () => {
    const { getByText, getByTestId } = render(<LandingPage />);
    const viewDetailsButton = getByText('View Details');
    fireEvent.press(viewDetailsButton);
    const detailsModal = getByTestId('detailsModal');
    expect(detailsModal).toBeDefined();
  });

  test('filters by airline correctly', () => {
    const { getByText, getByTestId } = render(<LandingPage />);
    const filterOption = getByText('AirAsia'); 
    fireEvent.press(filterOption);
    const filterModal = getByTestId('filterModal');
    expect(filterModal).toBeDefined();
  });

  test('navigates to details page when View Details button is pressed', () => {
    const { getByText, getByTestId } = render(<LandingPage />);
    const viewDetailsButton = getByText('View Details');
    fireEvent.press(viewDetailsButton);
    const detailsModal = getByTestId('detailsModal');
    expect(detailsModal).toBeDefined();

    const navigateButton = getByText('Navigate');
    fireEvent.press(navigateButton);
    const detailsPage = getByTestId('detailsPage');
    expect(detailsPage).toBeDefined();
  });

  test('clears filters when Clear Filters button is pressed', () => {
    const { getByText, getByTestId } = render(<LandingPage />);
    const filterOption = getByText('Vistara'); 
    fireEvent.press(filterOption);
    const filterModal = getByTestId('filterModal');
    expect(filterModal).toBeDefined();

    const clearFiltersButton = getByText('Clear Filters');
    fireEvent.press(clearFiltersButton);
    const updatedFilterOption = getByText('indiGo');
    expect(updatedFilterOption).toBeDefined();
  });

  test('sorts by price correctly', () => {
    const { getByText, getByTestId } = render(<LandingPage />);
    const sortOption = getByText('low'); 
    fireEvent.press(sortOption);
    const sortModal = getByTestId('sortModal');
    expect(sortModal).toBeDefined();
  });

  test('navigates to details page when selecting a flight', () => {
    const { getByText, getByTestId } = render(<LandingPage />);
    const flightItem = getByText({flightData1});
    fireEvent.press(flightItem);
    const detailsPage = getByTestId('detailsPage');
    expect(detailsPage).toBeDefined();
  });

  // Add more test cases as needed

});
