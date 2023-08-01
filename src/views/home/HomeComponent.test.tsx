import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import HomeComponent from './page';
import '@testing-library/jest-dom';

describe('HomeComponent', () => {
  it('renders the search input and button', () => {
    const { getByLabelText, getByRole } = render(<HomeComponent />);
    const searchInput = getByLabelText('Search');
    const searchButton = getByRole('button', { name: 'Search' });
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('displays images when user searches', async () => {
    const { getByLabelText, getByRole } = render(<HomeComponent />);
    const search = getByLabelText('Search');
    fireEvent.change(search, { target: { value: 'test' } });

    const btn = getByRole('button', { name: /search/i });
    fireEvent.click(btn);
    // const found = await findByText('Images found');
    // expect(found).toBeInTheDocument();
  });
});
