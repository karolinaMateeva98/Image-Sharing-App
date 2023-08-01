import React from 'react';
import { fireEvent, getByLabelText, render } from '@testing-library/react';
import SearchBarComponent from '../SearchBarComponent';
import '@testing-library/jest-dom';
import { ImageInterface } from '../../../../interface/Interfaces';
import userEvent from '@testing-library/user-event';

describe('components/Base/Button', () => {
  // const onChangeMock = jest.fn();
  const searchBar = React.cloneElement(
    <SearchBarComponent
      searchImagesResult={function (data: ImageInterface[]): void {
        throw new Error('Function not implemented.');
      }}
    />
  );

  it('renders the search input and button', () => {
    const { getByRole, getByLabelText } = render(searchBar);

    const searchInput = getByLabelText('Search');
    const searchButton = getByRole('button', { name: 'Search' });
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('should validate if input field is empty', () => {
    const { getByLabelText } = render(searchBar);

    const searchInput = getByLabelText('Search');
    userEvent.type(searchInput, 'Some text');
    userEvent.clear(searchInput);
    expect(searchInput).toHaveValue('');
  });

  test('should change style on hover', () => {
    const { getByRole } = render(searchBar);

    const searchButton = getByRole('button', { name: 'Search' });
    expect(searchButton).toHaveClass(
      'text-white absolute right-1 bottom-2 bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 focus:outline-none dark:focus:ring-blue-800'
    );
    userEvent.hover(searchButton);
    expect(searchButton).toHaveClass(
      'hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:hover:bg-blue-700'
    );
  });
});
