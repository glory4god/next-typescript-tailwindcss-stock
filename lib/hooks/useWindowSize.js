import React from 'react';

export default function useWindowXSize() {
  const [windowXSize, setWindowXSize] = React.useState({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowXSize({
        width: window.innerWidth >= 1000 ? 1000 : window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowXSize;
}
