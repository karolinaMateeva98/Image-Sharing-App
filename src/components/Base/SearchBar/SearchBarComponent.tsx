import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMessages from '../../../hooks/use-messages';
import { ImageInterface } from '../../../interface/Interfaces';
import FakeBackendService from '../../../service/FakeBackendService';
import Button from '../Button/Button';

type SearchImagesResultType = (data: ImageInterface[]) => void;

type Props = {
  searchImagesResult: SearchImagesResultType;
  className?: string;
};

export function SearchBarComponent({ searchImagesResult }: Props) {
  const [searchImage, setSearchImage] = useState('');
  const { setErrorMessage } = useMessages();

  const searchImages = async (image: string) => {
    try {
      await FakeBackendService.searchImages(image).then((data) => {
        searchImagesResult(data);
        setSearchImage('');
      });
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  return (
    <>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          ></svg>
        </div>
        <label htmlFor="default-search" className="hidden">
          Search
        </label>
        <input
          value={searchImage}
          onChange={(e) => setSearchImage(e.target.value)}
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></input>
        <Button
          classNames="text-white absolute right-1 bottom-2 bg-gray-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => searchImages(searchImage)}
        >
          Search
        </Button>
      </div>
    </>
  );
}

export default SearchBarComponent;
