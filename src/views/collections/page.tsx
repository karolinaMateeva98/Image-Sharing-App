import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CollectionInterface,
  ImageInterface
} from '../../interface/Interfaces';
import { addDoc, collection, doc } from 'firebase/firestore';
import { db } from '../../firebaseSetup';
import { useAuth } from '../../provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import { showErrorMessage, showSuccessMessage } from '../../utils/Toast';
import { imgInitState } from '../../utils/InitialStates';
import FakeBackendService from '../../service/FakeBackendService';
import useMessages from '../../hooks/use-messages';
import useUser from '../../hooks/use-user';
import SearchBarComponent from '../../components/Base/SearchBar/SearchBarComponent';
import Button from '../../components/Base/Button/Button';

export function CollectionsComponent() {
  const [selectedImage, setSelectedImage] =
    useState<ImageInterface>(imgInitState);
  const [collectionId, setCollectionId] = useState('');
  const [collectionName, setCollectionName] = useState('');
  const [selectedCollectionId, setSelectedCollectionId] = useState('');
  const [selectedCollectionName, setSelectedCollectionName] = useState('');
  const [description, setDescription] = useState('');
  const [collections, setCollections] = useState<CollectionInterface[]>([]);
  const { setErrorMessage, setSuccessMessage } = useMessages();
  const { user } = useAuth();
  const [searchResult, setSearchResult] = useState<ImageInterface[]>([]);
  const searchImagesResult = (data: ImageInterface[]) => {
    setSearchResult(data);
  };

  useUser();

  const getUserCollections = useCallback(async (username: string) => {
    try {
      await FakeBackendService.getUserCollections(username).then((data) => {
        setCollections(data);
      });
    } catch (error: any) {
      setErrorMessage(error);
    }
  }, []);

  useEffect(() => {
    //TODO
    getUserCollections('borisov93');
  }, [getUserCollections]);

  const createCollection = async (
    collectionName: string,
    description: string
  ) => {
    if (!collectionName) {
      showErrorMessage('Please, enter collection name!');
      return;
    }
    try {
      await FakeBackendService.createCollection(
        collectionName,
        description
      ).then(async (data) => {
        setCollectionId(data.id);
        setSelectedImage(imgInitState);
        await handleCreateCollectionFirestore();
        await getUserCollections('borisov93');
      });
    } catch (error: any) {
      return setErrorMessage(error);
    }
  };

  const addPhotoToACollection = async (
    selectedImage: ImageInterface,
    collectionId: string
  ) => {
    const selectedImageId = selectedImage.id;

    if (!selectedImageId) {
      setErrorMessage('Please, select an image!');
      return;
    }
    if (!collectionId) {
      setErrorMessage('You should create or select a collection first!');
      return;
    }

    try {
      await FakeBackendService.addPhotoToACollection(
        selectedImageId,
        selectedImage,
        collectionId
      ).then(async () => await handleAddImgToCollFirestore());
    } catch (error: any) {
      return setErrorMessage(error);
    }
  };

  //Firestore operations
  const handleCreateCollectionFirestore = async () => {
    try {
      const userCollectionRef = collection(db, 'imagesCollection');
      doc(userCollectionRef, `${user?.uid}`);

      setSuccessMessage(`Collection "${collectionName}" created successfully!`);

      // TODO: check if collection with name exists => Cloud Firestore currently doesn't support native indexing
      //or search for text fields in documents. To enable full text search of your Cloud Firestore data,
      //use a dedicated third-party search service such as Algolia
    } catch (e: any) {
      console.error('Error creating collection: ', e);
      setErrorMessage(e);
    }
  };

  const handleAddImgToCollFirestore = async () => {
    const userCollectionRef = collection(db, 'imagesCollection');
    const userDocRef = doc(userCollectionRef, `${user?.uid}`);
    const collName = !collectionName ? selectedCollectionName : collectionName;

    try {
      await addDoc(collection(userDocRef, `${collName}`), {
        selectedImage
      })
        .then(() => {
          showSuccessMessage(
            `Image added successfully to "${collName}" collection!`
          );
        })
        .then(() => {
          setCollectionId('');
          setCollectionName('');
          setSelectedCollectionId('');
          setSelectedCollectionName('');
          setSelectedImage(imgInitState);
        });
    } catch (e: any) {
      console.error('Error adding image to the collection: ', e);
      setErrorMessage(e);
    }
  };

  return (
    <>
      <div className="min-h-screen pt-2">
        <div className="container mx-auto">
          <div className="inputs w-full max-w-3xl p-6 mx-auto">
            <ToastContainer />
            <h2 className="text-2xl text-gray-900">Create Collection</h2>
            <div className="mt-6 border-t border-gray-400 pt-4">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-full px-3 mb-6">
                  <ToastContainer />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-text-1"
                  >
                    Collection name
                  </label>
                  <input
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="grid-text-1"
                    type="text"
                    required
                    onChange={(e: any) => setCollectionName(e.target.value)}
                  ></input>
                </div>
                <div className="w-full md:w-full px-3 mb-6">
                  <ToastContainer />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-text-1"
                    placeholder="Description"
                  >
                    Description
                  </label>
                  <input
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="grid-text-1"
                    type="text"
                    required
                    onChange={(e: any) => setDescription(e.target.value)}
                  ></input>
                </div>
                <div className="w-full md:w-full px-3 mb-6">
                  <Button
                    onClick={() =>
                      createCollection(collectionName, description)
                    }
                    classNames="text-white bg-gray-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Create
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-3xl p-6 mx-auto">
            <h2 className="text-2xl text-gray-900">
              Add Image to a Collection
            </h2>
            <div className="w-full max-w-3xl mx-auto">
              <div className="mt-6 border-t border-gray-400 pt-4 mb-6">
                <label
                  htmlFor="collections"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Select a collection
                </label>
                <select
                  id="collections"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e: any) => {
                    setSelectedCollectionId(e.target.selectedOptions[0].id);
                    setSelectedCollectionName(e.target.value);
                  }}
                >
                  <option defaultValue=""></option>
                  {collections.length !== 0
                    ? collections.map(
                        (val: CollectionInterface, index: number) => {
                          return (
                            <option key={val.id} id={val.id}>
                              {val.title}
                            </option>
                          );
                        }
                      )
                    : ''}
                </select>
              </div>
            </div>
            <label
              htmlFor="default-search"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Search for images by keyword
            </label>
            <SearchBarComponent
              searchImagesResult={searchImagesResult}
            ></SearchBarComponent>
          </div>
        </div>
        {searchResult.length !== 0 ? (
          <div className="w-full max-w-3xl mx-auto">
            <div className="w-full p-6 mx-auto mb-2">
              <button
                onClick={() => {
                  const collId = !collectionId
                    ? selectedCollectionId
                    : collectionId;
                  console.log(collId);
                  addPhotoToACollection(selectedImage, collId);
                }}
                className="text-white bg-gray-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Add Image
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 p-6 mx-auto">
              {searchResult.map((val: ImageInterface, index: number) => {
                return (
                  <div
                    className="flex flex-col justify-center items-center hover:cursor-pointer border shadow border border-gray-400 rounded-lg"
                    key={index}
                  >
                    <span>
                      {selectedImage.id === val.id ? (
                        <div className="circle">
                          <div className="checkmark"></div>
                        </div>
                      ) : (
                        ''
                      )}
                      <img
                        key={val.id}
                        className={`h-50 w-60 rounded-t-lg ${
                          selectedImage.id === val.id
                            ? 'grayscale cursor-not-allowed'
                            : ''
                        }`}
                        src={val.urls.small}
                        alt={val.alt_description}
                        onClick={() => {
                          setSelectedImage(val);
                        }}
                      />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default CollectionsComponent;
