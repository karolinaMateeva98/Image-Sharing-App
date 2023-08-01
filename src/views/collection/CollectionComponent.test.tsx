import React from 'react';
import { findByText, fireEvent, render, screen } from '@testing-library/react';
import CollectionComponent from './page';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

describe('CollectionComponent', () => {
  it('renders', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <CollectionComponent />
      </BrowserRouter>
    );
  });
});
