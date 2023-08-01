import { useCallback, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import {
  CollectionInterface,
  ImageInterface
} from '../../interface/Interfaces';
import { initCollectionData } from '../../utils/InitialStates';
import FakeBackendService from '../../service/FakeBackendService';
import useMessages from '../../hooks/use-messages';
import useUser from '../../hooks/use-user';
import { useParams } from 'react-router-dom';

export function CollectionComponent() {
  const [collectionImages, setCollectionImages] = useState<ImageInterface[]>(
    []
  );
  const [collectionData, setCollectionData] =
    useState<CollectionInterface>(initCollectionData);
  const { setErrorMessage, setSuccessMessage } = useMessages();
  const { collectionId } = useParams();
  const collectionLink = `https://unsplash.com/collections/${collectionId}/${collectionData.title}`;

  useUser();

  const loadCollectionData = useCallback(async () => {
    try {
      await FakeBackendService.loadCollectionData(collectionId || '').then(
        (data) => {
          setCollectionData(data);
        }
      );
    } catch (error: any) {
      setErrorMessage(error);
    }
  }, []);

  const loadCollectionImages = useCallback(async () => {
    try {
      await FakeBackendService.loadCollectionImages(collectionId || '').then(
        (data) => {
          console.log(data);
          setCollectionImages(data);
        }
      );
    } catch (error: any) {
      setErrorMessage(error);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(collectionLink);
    setSuccessMessage('Collection link copied to clipboard!');
  };

  useEffect(() => {
    loadCollectionData();
    loadCollectionImages();
  }, [loadCollectionData, loadCollectionImages]);

  return (
    <>
      <div className="min-h-screen pt-2">
        <div className="container mx-auto">
          <div className="inputs w-full max-w-3xl p-6 mx-auto">
            <ToastContainer />
            <div className="flex items-center justify-between">
              <h2 className="text-2xl text-gray-900">
                Collection {collectionData.title}
              </h2>
              <button
                onClick={() => handleCopy()}
                className="copy-button text-black bg-gray-100 border border-gray-400 hover:border-gray-900 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2 py-2.5 mr-2 focus:outline-none"
              >
                <i className="fa fa-share"></i> Share
              </button>
            </div>
            <div className="mt-4 border-t border-gray-400 pt-4">
              {collectionImages.length !== 0 ? (
                <div className="grid grid-cols-3 gap-2 p-2">
                  {collectionImages.map(
                    (val: ImageInterface, index: number) => {
                      return (
                        <div
                          className="mr-2 hover:cursor-pointer border shadow border border-gray-400 rounded-lg"
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
                    }
                  )}
                </div>
              ) : (
                <h1 className="flex justify-center text-xl font-bold p-5">
                  Error loading images...
                </h1>
              )}
            </div>
            <div className="mt-6 border-t border-gray-400 pt-4">
              <h6 className="text-xl text-gray-900">
                Total images: {collectionData.total_photos}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CollectionComponent;
