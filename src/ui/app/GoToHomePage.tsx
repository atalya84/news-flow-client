// navigationUtils.ts
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export const ReturnToHomePage = () => {
  const navigate = useNavigate();
  
  const navigateToHomePage = useCallback(() => {
    navigate('/');
  }, [navigate]);
  
  return {
    navigateToHomePage
  };
};
