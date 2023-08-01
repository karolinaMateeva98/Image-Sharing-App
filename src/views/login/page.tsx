import { useState } from 'react';
import { signInWithRedirect } from 'firebase/auth';
import { googleProvider } from '../../firebaseSetup';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleButton from 'react-google-button';
import { useAuth } from '../../provider/AuthProvider';
import { CLIENT_ID } from '../../utils/AppConstants';
import useMessages from '../../hooks/use-messages';

export default function LoginComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setErrorMessage } = useMessages();
  const { user, signIn, auth } = useAuth();

  const redirectUri = 'http://localhost:3000/auth';

  const handleLogin = async (e: any) => {
    try {
      //login with firebase
      await signIn(email, password).then(() => {
        //then redirect user, so as to get the token from unsplash
        window.location.href = `https://unsplash.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=public+read_user+write_user+read_photos+write_photos+write_likes+write_followers+read_collections+write_collections`;
      });
    } catch (error: any) {
      //show error
      setErrorMessage(error);
    }
  };

  const handleOnGoogleLogin = async () => {
    googleProvider.addScope('profile');
    googleProvider.addScope('email');

    try {
      //login with firebase
      await signInWithRedirect(auth, googleProvider).then(() => {
        //then redirect user, so as to get the token from unsplash
        window.location.href = `https://unsplash.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=public+read_user+write_user+read_photos+write_photos+write_likes+write_followers+read_collections+write_collections`;
      });
    } catch (error: any) {
      //add an error toast
      setErrorMessage(error);
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"></a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <ToastContainer />
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e: any) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e: any) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ></input>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={(e: any) => handleLogin(e)}
                    className="text-white bg-gray-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Sign in
                  </button>
                </div>

                <p className="flex justify-center text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account yet?..
                  <button
                    onClick={() => {
                      navigate('/register');
                    }}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </button>
                </p>

                <div className="flex justify-center">
                  <GoogleButton
                    onClick={() => {
                      console.log('Google button clicked');
                      handleOnGoogleLogin();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
