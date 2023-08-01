import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import FakeBackendService from '../../service/FakeBackendService';
import useUser from '../../hooks/use-user';

export default function AuthComponent() {
  const navigate = useNavigate();
  const code =
    new URLSearchParams(window.location.search).get('code')?.trim() || '';

  useUser();

  const authenticate = useCallback(async (code: string) => {
    try {
      await FakeBackendService.authenticate(code).then((accessToken) => {
        // save the access token in localStorage
        localStorage.setItem('token', accessToken);
        navigate('/');
      });
    } catch (error: any) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    authenticate(code);
  }, [authenticate]);

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"></a>
        </div>
      </section>
    </>
  );
}
