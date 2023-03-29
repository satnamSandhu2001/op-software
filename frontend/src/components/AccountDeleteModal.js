import React, { useEffect, useRef } from 'react';

const AccountDeleteModal = ({ cancel, confirm }) => {
  const modalRef = useRef('');

  useEffect(() => {
    if (modalRef.current) {
      if (modalRef.current.classList.contains('opacity-0')) {
        modalRef.current.classList.remove('opacity-0');
        modalRef.current.classList.add('opacity-100');
      }
    }
  }, [modalRef]);

  return (
    <div
      ref={modalRef}
      className="opacity-0 transition-opacity duration-1000 flex items-center justify-center h-screen w-screen fixed top-0 left-0 z-30 bg-black/70"
    >
      {/* inner */}
      <div className="mx-4 sm:mx-0 max-w-md bg-white p-8 rounded-lg">
        <div>
          <p className="leading-relaxed font-bold">
            You are going to Delete your Account!
          </p>
          <p className="font-bold mb-6 text-red-500 leading-relaxed">
            Are you sure?
          </p>
          <p className="italic leading-relaxed text-sm">
            Note that you will close your{' '}
            <span className="font-bold">OpSoftware</span> account!. Your premium
            subscriptions will not be canceled untill expiration date.
          </p>
          <div className="flex justify-between gap-x-4 mt-6">
            <button
              className="text-black py-2 px-8 rounded cursor-pointer bg-indigo-200 hover:bg-indigo-300 duration-500"
              type="button"
              onClick={cancel}
            >
              Keep Account
            </button>
            <button
              className="bg-red-500 text-white py-2 px-8 rounded cursor-pointer hover:bg-red-600 duration-500"
              type="button"
              onClick={confirm}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDeleteModal;
