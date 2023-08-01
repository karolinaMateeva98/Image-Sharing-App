import { useCallback, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageInterface } from '../../interface/Interfaces';
import { imgInitState } from '../../utils/InitialStates';
import FakeBackendService from '../../service/FakeBackendService';
import useMessages from '../../hooks/use-messages';
import useUser from '../../hooks/use-user';
import { useParams } from 'react-router-dom';

export function ImageComponent() {
  const [image, setImage] = useState<ImageInterface>(imgInitState);
  const { photoId } = useParams();
  const { setErrorMessage } = useMessages();

  useUser();

  const loadImage = useCallback(async () => {
    try {
      await FakeBackendService.loadImage(photoId || '').then((data) => {
        console.log(data);
        setImage(data);
      });
    } catch (error: any) {
      setErrorMessage(error);
    }
  }, []);

  useEffect(() => {
    loadImage();
  }, [loadImage]);

  return (
    <>
      <div className="min-h-screen pt-2">
        <div className="container mx-auto">
          <ToastContainer />
          {image.id !== 0 ? (
            <>
              <div className="flex justify-center">
                <span>
                  <img
                    key={image.id}
                    className="h-100 w-100 rounded-t-lg"
                    src={image.urls.small}
                    alt={image.alt_description}
                  />
                </span>
              </div>
              <div className="flex justify-center text-center m-5">
                <div className="pr-10">
                  <p className="font-bold text-gray-700 text-xl">
                    {image.likes}
                  </p>
                  <p className="text-gray-400">Likes</p>
                  <i className="fa fa-heart"></i>
                </div>
                <div>
                  <p className="font-bold text-gray-700 text-xl">
                    {image.views}
                  </p>
                  <p className="text-gray-400">Views</p>
                  <i className="fa fa-eye"></i>
                </div>
              </div>
            </>
          ) : (
            <h1 className="flex justify-center text-xl font-bold p-5">
              Error loading image...
            </h1>
          )}
        </div>
      </div>
    </>
  );
}

export default ImageComponent;
