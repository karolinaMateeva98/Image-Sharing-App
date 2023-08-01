import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe('components/Base/Button', () => {
  const testSearchButtonComponent = (
    <Button classNames="text-white absolute right-1 bottom-2 bg-gray-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
      Search
    </Button>
  );

  const testCreateButtonComponent = (
    <Button classNames="text-white bg-gray-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
      Create
    </Button>
  );

  test('search button should have hovered style', () => {
    const { getByRole } = render(testSearchButtonComponent);

    const searchButton = getByRole('button', { name: 'Search' });
    expect(searchButton).toHaveClass(
      'text-white absolute right-1 bottom-2 bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 focus:outline-none dark:focus:ring-blue-800'
    );
    userEvent.hover(searchButton);
    expect(searchButton).toHaveClass(
      'hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:hover:bg-blue-700'
    );
  });

  test('create button should have hovered style', () => {
    const { getByRole } = render(testCreateButtonComponent);

    const createButton = getByRole('button', { name: 'Create' });

    expect(createButton).toHaveClass(
      'text-white bg-gray-500 font-medium rounded-lg text-md px-5 py-2 py-2.5 mr-2 dark:bg-blue-600 focus:outline-none dark:focus:ring-blue-800'
    );
    userEvent.hover(createButton);
    expect(createButton).toHaveClass(
      'hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:hover:bg-blue-700'
    );
  });
});
