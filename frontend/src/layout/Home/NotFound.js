import React from 'react';
import { Link } from 'react-router-dom';
import text_404 from '../../images/text-404.png';
import MetaData from '../../components/MetaData';

const NotFound = () => {
  return (
    <>
      <MetaData title={`OpSoftware - Page Not Found`} />
      <div className="container mx-auto min-h-screen flex flex-col items-center justify-center pt-12">
        <img
          src={text_404}
          alt=""
          className="w-[90%] sm:w-[80%] md:max-w-lg mb-4"
        />
        <p className="text-2xl sm:text-4xl font-black text-black/70 leading-relaxed sm:leading-relaxed">
          Oops.! Page Not Found!
        </p>
        <p>The page vou are looking for does not exist</p>
        <Link
          to="/"
          className="mt-8 font-semibold w-fit text-white bg-blue rounded-full px-7 py-3 transition-colors hover:bg-indigo-600 duration-300 flex items-center gap-x-1"
        >
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
