import React, { useEffect, useRef } from 'react';

const Loader = () => {
  const loaderRef = useRef('');
  useEffect(() => {
    if (loaderRef.current) {
      if (loaderRef.current.classList.contains('opacity-0')) {
        loaderRef.current.classList.remove('opacity-0');
        loaderRef.current.classList.add('opacity-100');
      }
    }
  }, [loaderRef]);

  return (
    <div
      ref={loaderRef}
      className="opacity-0 transition-opacity duration-1000 flex items-center justify-center h-screen w-screen fixed top-0 left-0 z-30 bg-black/70"
    >
      <div className="animate-spin h-36 w-36">
        <div
          className="h-full w-full border-4 border-transparent border-t-white
       border-b-white rounded-[50%]"
        ></div>
      </div>
    </div>
  );
};

export default Loader;
