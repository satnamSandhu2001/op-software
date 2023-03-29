import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../store/actions/userAction';

const ForgotPassword = ({ cancel }) => {
  const forgotModalRef = useRef('');
  const dispatch = useDispatch();

  const [email, setemail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
    cancel();
  };

  useEffect(() => {
    if (forgotModalRef.current) {
      if (forgotModalRef.current.classList.contains('opacity-0')) {
        forgotModalRef.current.classList.remove('opacity-0');
        forgotModalRef.current.classList.add('opacity-100');
      }
    }
  }, [forgotModalRef]);

  return (
    <div
      ref={forgotModalRef}
      className="opacity-0 transition-opacity duration-1000 flex items-center justify-center h-screen w-screen fixed top-0 left-0 z-30 bg-black/70"
    >
      {/* inner */}
      <form
        onSubmit={handleSubmit}
        className="mx-4 sm:mx-0 max-w-lg bg-white p-8 rounded-lg"
      >
        <div>
          <p className="leading-relaxed font-bold text-xl mb-4">
            Forgot Password
          </p>
          <div className="flex border border-gray-400 mb-4 p-3 bg-white rounded-md overflow-hidden">
            <span className="inline-flex items-center px-3 text-gray-500 text-sm border-r-2 border-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-mail"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#6b7280"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <polyline points="3 7 12 13 21 7" />
              </svg>
            </span>
            <input
              className="pl-3 w-full focus:outline-none"
              type="email"
              placeholder="Email"
              name="email"
              required
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <p className="leading-relaxed text-black/60">
            Enter the email address associated with your
            <span className="font-bold"> OpSoftware</span> account.
          </p>
          <div className="flex justify-between gap-x-4 mt-6">
            <button
              className="text-black py-2 px-8 rounded cursor-pointer bg-indigo-200 hover:bg-indigo-300 duration-500"
              type="button"
              onClick={cancel}
            >
              Cancel
            </button>
            <button
              className="bg-blue text-white py-2 px-8 rounded cursor-pointer hover:bg-indigo-500 duration-500"
              type="submit"
            >
              Send Link
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
