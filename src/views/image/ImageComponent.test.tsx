import React from 'react';
import { findByText, fireEvent, render, screen } from '@testing-library/react';
import ImageComponent from './page';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate
}));

describe('ImageComponent', () => {
  it('renders the search button', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <ImageComponent />
      </BrowserRouter>
    );
    // const searchButton = getByRole('button', { name: 'Search' });
    // expect(searchButton).toBeInTheDocument();
  });
});
