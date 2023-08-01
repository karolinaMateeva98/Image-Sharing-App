import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ImageInterface,
  CollectionInterface
} from '../../interface/Interfaces';
import { addDoc, collection, doc } from 'firebase/firestore';
import { db } from '../../firebaseSetup';
import { initUserData } from '../../utils/InitialStates';
import React from 'react';
import FakeBackendService from '../../service/FakeBackendService';
import useUser from '../../hooks/use-user';
import useMessages from '../../hooks/use-messages';
import { useAuth } from '../../provider/AuthProvider';

function UserProfileComponent() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<ImageInterface[]>([]);
  const [collections, setCollections] = useState<CollectionInterface[]>([]);
  const [userData, setUserData] = useState(initUserData);
  const [activeTab, setActiveTab] = useState('photos');
  const { setErrorMessage } = useMessages();
  const { user } = useAuth();

  useUser();

  const getUserPhotos = async (username: string) => {
    try {
      await FakeBackendService.getUserPhotos(username).then((data) => {
        console.log(data);
        setPhotos(data);
        setActiveTab('photos');
      });
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const getUserCollections = async (username: string) => {
    try {
      await FakeBackendService.getUserCollections(username).then((data) => {
        console.log(data);
        setCollections(data);
        setActiveTab('collections');
      });
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const saveCurrentUserInFirestore = useCallback(
    async (data: string) => {
      // Store the user's data in the Firestore database
      const userCollectionRef = collection(db, 'users');
      const userDocRef = doc(userCollectionRef, `${user?.uid}`);
      try {
        await addDoc(collection(userDocRef, `${user?.uid}`), {
          data
        });
      } catch (e: any) {
        console.error('Error adding user: ', e);
      }
    },
    [user]
  );

  const getUserData = useCallback(async () => {
    try {
      await FakeBackendService.getUserData().then(async (data) => {
        setUserData(data);
        await saveCurrentUserInFirestore(data);
      });
    } catch (error: any) {
      setErrorMessage(error);
    }
  }, [saveCurrentUserInFirestore]);

  useEffect(() => {
    getUserData();
  }, []);

  const loadPhoto = async (photoId: number) => {
    try {
      await FakeBackendService.loadUserPhotos(photoId).then((data) => {
        console.log(data);
        navigate(`/photos/${photoId}`);
      });
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  const loadCollection = async (collectionId: string) => {
    try {
      await FakeBackendService.loadUserCollections(collectionId).then(
        (data) => {
          console.log(data);
          navigate(`/collection/${collectionId}`);
        }
      );
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  return (
    <>
      <ToastContainer />
      {userData.id !== '' ? (
        <div className="min-h-screen">
          <div className="container mx-auto">
            <div className="inputs w-full max-w-6xl p-4 mx-auto">
              <div className="p-8 bg-white shadow">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="grid grid-cols-3 text-center order-last md:order-first mt-4 md:mt-0">
                    <div>
                      <p className="font-bold text-gray-700 text-lg">
                        {userData.followers_count}
                      </p>
                      <p className="text-gray-400 text-sm">Followers</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-700 text-lg">
                        {userData.following_count}
                      </p>
                      <p className="text-gray-400 text-sm">Following</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-700 text-lg">
                        {userData.total_likes}
                      </p>
                      <p className="text-gray-400 text-sm">Likes</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-14 flex items-center justify-center text-indigo-500">
                      <img
                        className="rounded-full"
                        src={
                          userData.profile_image !== undefined
                            ? userData.profile_image.large
                            : 'https://www.nicepng.com/maxp/u2y3a9e6t4o0a9w7/'
                        }
                      ></img>
                    </div>
                  </div>

                  <div className="space-x-4 flex justify-between mt-32 md:mt-0 md:justify-center">
                    <button
                      onClick={() => getUserPhotos(userData.username)}
                      className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                    >
                      Images ({userData.total_photos})
                    </button>
                    <button
                      onClick={() => getUserCollections(userData.username)}
                      className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                    >
                      Collections ({userData.total_collections})
                    </button>
                  </div>
                </div>
                <div className="mt-24 flex flex-row justify-between justify-center">
                  <div className="pb-12 text-center">
                    <h1 className="text-4xl font-medium text-gray-700">
                      {userData.first_name} {userData.last_name},
                      <span className="font-light text-gray-500">
                        {userData.username}
                      </span>
                    </h1>
                    <p className="font-light text-gray-600 mt-3">
                      {userData.location !== null
                        ? userData.location
                        : 'Sofia, Bulgaria'}
                    </p>
                    <p className="text-gray-600 text-center font-light lg:px-16">
                      {userData.bio !== null
                        ? userData.bio
                        : 'An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.'}
                    </p>
                  </div>
                </div>
              </div>
              {activeTab == 'photos' ? (
                <div className="grid grid-cols-3 gap-2 p-2">
                  {photos.map((val: ImageInterface, index: number) => {
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
                            onClick={() => loadPhoto(val.id)}
                          />
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2 p-2">
                  {collections.map(
                    (val: CollectionInterface, index: number) => {
                      return (
                        <div
                          key={index}
                          className="mr-2"
                          onClick={() => loadCollection(val.id)}
                        >
                          <a
                            href="#"
                            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                          >
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                              {val.title}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                              Total photos: {val.total_photos}
                            </p>
                          </a>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {/* <ToastContainer />
      {userData.id !== '' ? (
        <div className="min-h-screen">
          <div className="container mx-auto">
            <div className="inputs w-full max-w-6xl p-4 mx-auto">
              <div className="p-16">
                <div className="p-8 bg-white shadow">
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                      <div>
                        <p className="font-bold text-gray-700 text-xl">
                          {userData.followers_count}
                        </p>
                        <p className="text-gray-400">Followers</p>
                      </div>
                      <div>
                        <p className="font-bold text-gray-700 text-xl">
                          {userData.following_count}
                        </p>
                        <p className="text-gray-400">Following</p>
                      </div>
                      <div>
                        <p className="font-bold text-gray-700 text-xl">
                          {userData.total_likes}
                        </p>
                        <p className="text-gray-400">Likes</p>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                        <img
                          className="rounded-full"
                          src={userData.profile_image.large}
                        ></img>
                      </div>
                    </div>

                    <div className="space-x-4 flex justify-between mt-32 md:mt-0 md:justify-center">
                      <button
                        onClick={() => getUserPhotos(userData.username)}
                        className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                      >
                        Images ({userData.total_photos})
                      </button>
                      <button
                        onClick={() => getUserCollections(userData.username)}
                        className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                      >
                        Collections ({userData.total_collections})
                      </button>
                    </div>
                  </div>

                  <div className="mt-20 text-center border-b pb-12">
                    <h1 className="text-4xl font-medium text-gray-700">
                      {userData.first_name} {userData.last_name},
                      <span className="font-light text-gray-500">
                        {userData.username}
                      </span>
                    </h1>
                    <p className="font-light text-gray-600 mt-3">
                      {userData.location !== null
                        ? userData.location
                        : 'Sofia, Bulgaria'}
                    </p>
                    <p className="text-gray-600 text-center font-light lg:px-16">
                      {userData.bio !== null
                        ? userData.bio
                        : 'An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.'}
                    </p>
                  </div>

                  {activeTab == 'photos' ? (
                    <div className="mt-12 flex flex-row">
                      {photos.map((val: ImageInterface, index: number) => {
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
                                onClick={() => loadPhoto(val.id)}
                              />
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="mt-12 flex flex-row">
                      {collections.map(
                        (val: CollectionInterface, index: number) => {
                          return (
                            <div
                              key={index}
                              className="mr-2"
                              onClick={() => loadCollection(val.id)}
                            >
                              <a
                                href="#"
                                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                              >
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                  {val.title}
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                  Total photos: {val.total_photos}
                                </p>
                              </a>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )} */}
    </>
  );
}
export default React.memo(UserProfileComponent);
