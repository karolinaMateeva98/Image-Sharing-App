import { useMemo, useState } from 'react';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '../../firebaseSetup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updatePassword } from 'firebase/auth';
import { UpdateUserInterface } from '../../interface/Interfaces';
import FakeBackendService from '../../service/FakeBackendService';
import useUser from '../../hooks/use-user';
import useMessages from '../../hooks/use-messages';
import { useAuth } from '../../provider/AuthProvider';

export default function UserSettingsComponent() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [url, setUrl] = useState('');
  const [userName, setUserName] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newBio, setNewBio] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const { setErrorMessage, setSuccessMessage } = useMessages();
  const { user } = useAuth();

  useUser();

  const changePassword = async () => {
    const email = user?.email || '';

    const credentials = EmailAuthProvider.credential(email, currentPassword);

    reauthenticateWithCredential(user!, credentials)
      .then(() => {
        updatePassword(auth.currentUser!, newPassword)
          .then(() => {
            setSuccessMessage('Password updated!');
          })
          .catch((error) => {
            //show error
            setErrorMessage(error);
          });
      })
      .catch((error) => {
        console.log(`${error}`);
        // showErrorMessage(error);
        setErrorMessage(error);
      });
  };

  const updateUserProfile = async (updatedUser: UpdateUserInterface) => {
    try {
      await FakeBackendService.updateUserProfile(updatedUser).then((data) => {
        console.log(data);
        setSuccessMessage('User settings updated successfully!');
      });
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  return (
    <>
      <div className="min-h-screen pt-2">
        <div className="container mx-auto">
          <div className="inputs w-full max-w-3xl p-6 mx-auto">
            <h2 className="text-2xl text-gray-900">Personal information</h2>
            <ToastContainer />
            <div className="mt-6 border-t border-gray-400 pt-4">
              <div className="flex items-center justify-between mt-4">
                <div className="w-full md:w-full px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    first name
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                    onChange={(e: any) => setNewFirstName(e.target.value)}
                  ></input>
                </div>
                <div className="w-full md:w-full px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    last name
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                    onChange={(e: any) => setNewLastName(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="w-full md:w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  username
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                  type="text"
                  onChange={(e: any) => setUserName(e.target.value)}
                ></input>
              </div>
              <div className="w-full md:w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  About
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                  type="text"
                  onChange={(e: any) => setNewBio(e.target.value)}
                ></input>
              </div>
              {/* <div className="w-full md:w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Portfolio/Personal URL
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                  type="text"
                  placeholder="https://"
                  onChange={(e: any) => setUrl(e.target.value)}
                ></input>
              </div> */}
              <div className="w-full md:w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                  type="email"
                  onChange={(e: any) => setNewEmail(e.target.value)}
                ></input>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() =>
                    updateUserProfile({
                      username: userName,
                      first_name: newFirstName,
                      last_name: newLastName,
                      email: newEmail,
                      url,
                      bio: newBio
                    })
                  }
                  className="text-white bg-gray-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  // className="text-black bg-gray-100 border border-gray-400 hover:border-gray-900 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2 py-2.5 mr-2 focus:outline-none"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>

          <div className="inputs w-full max-w-3xl p-6 mx-auto">
            <h2 className="text-2xl text-gray-900">Password Change</h2>
            <div className="mt-6 border-t border-gray-400 pt-4">
              <div className="flex items-center justify-between mt-4">
                <div className="w-full md:w-full px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Current password
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="password"
                    onChange={(e: any) => setCurrentPassword(e.target.value)}
                  ></input>
                </div>
                <div className="w-full md:w-full px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    New password
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="password"
                    onChange={(e: any) => setNewPassword(e.target.value)}
                  ></input>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => changePassword()}
                    className="text-white bg-gray-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
