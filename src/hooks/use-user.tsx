import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';

const useUser = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return useEffect(() => {
    // console.log('logged in');
    if (!user) {
      navigate('/');
    }
  }, [user]);
};

export default useUser;
