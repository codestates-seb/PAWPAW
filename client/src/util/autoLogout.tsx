import { useEffect } from 'react';

const AutoLogout = () => {
  const handleLogout = () => {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('Refresh');
    localStorage.removeItem('petId');
    localStorage.removeItem('code');
    localStorage.removeItem('check');
    localStorage.removeItem('Admin');
  };

  useEffect(() => {
    window.onbeforeunload = handleLogout;
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return null;
};

export default AutoLogout;
