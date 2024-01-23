import { useState, useEffect } from 'react';

interface UseWindowSize {
  windowHeight: number;
  elementFullHieght: number;
}

const useGetWindowSize = (): UseWindowSize => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [elementFullHieght, setElementFullHieght] = useState(window.innerHeight - 100);

  useEffect(() => {
    const handleResize = () => {
      const newWindowHeight = window.innerHeight;
      setWindowHeight(newWindowHeight);
      setElementFullHieght(newWindowHeight - 300);
    };

    setWindowHeight(window.innerHeight);
    setElementFullHieght(window.innerHeight - 250);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  return { windowHeight, elementFullHieght };
};

export default useGetWindowSize;
