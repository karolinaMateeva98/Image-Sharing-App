import { useEffect, useState } from 'react';
import { ImageInterface } from '../../interface/Interfaces';
import FakeBackendService from '../../service/FakeBackendService';
import useMessages from '../../hooks/use-messages';
import SearchBarComponent from '../../components/Base/SearchBar/SearchBarComponent';

export function HomeComponent() {
  const [searchResult, setSearchResult] = useState<ImageInterface[]>([]);
  const searchImagesResult = (data: ImageInterface[]) => {
    setSearchResult(data);
  };

  useEffect(() => {
    console.log(localStorage.getItem('token'));
  }, []);

  return (
    <>
      <div className="min-h-screen pt-2">
        <div className="container mx-auto">
          <div className="inputs w-full max-w-3xl p-6 mx-auto">
            <h2 className="text-2xl text-gray-900 mb-5">
              Search for images by keyword
            </h2>
            <SearchBarComponent
              searchImagesResult={searchImagesResult}
            ></SearchBarComponent>

            {searchResult.length !== 0 ? (
              <div className="grid grid-cols-3 gap-2 p-2">
                {searchResult.map((val: ImageInterface, index: number) => {
                  return (
                    <div
                      className="max-w-2xl flex flex-col justify-center items-center hover:cursor-pointer border shadow border border-gray-400 rounded-lg"
                      key={index}
                    >
                      <span>
                        <img
                          key={val.id}
                          className="h-50 w-60 rounded-t-lg"
                          src={val.urls.small}
                          alt={val.alt_description}
                        />
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeComponent;
