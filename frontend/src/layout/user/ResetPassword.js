import React, { useEffect, useState } from 'react';
import { RiLock2Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import {
  loadUser,
  resetPassword,
  resetStateResetPassword,
} from '../../store/actions/userAction';
import MetaData from '../../components/MetaData';

const ResetPassword = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { error, message, success } = useSelector(
    (state) => state.resetPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const [password, setpassword] = useState('');
  const [passwordType, setpasswordType] = useState('password');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [confirmPasswordType, setconfirmPasswordType] = useState('password');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.warn('Password not Matched!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (password.length < 8) {
      return toast.warn('Password must be greater than 8 characters', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    const formData = {
      password,
      confirmPassword,
    };
    dispatch(resetPassword(id, formData));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/panel/account');
    }
    if (error) {
      toast.error(error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (message) {
      toast.success(error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (success) {
      navigate('/panel/account');
      dispatch(resetStateResetPassword());
    }
  }, [error, message, success, dispatch, navigate, isAuthenticated]);

  return (
    <>
      <MetaData title={`OpSoftware - Reset Password`} />
      <ToastContainer />
      <div className="select-none flex items-center justify-center h-screen w-screen fixed top-0 left-0 bg-reset-password">
        {/* inner */}
        <form
          onSubmit={handleSubmit}
          className="mx-4 sm:mx-0 max-w-lg bg-white p-8 rounded-lg shadow-soft-lg"
        >
          <div>
            <RiLock2Line fill="#600ee4" size="1.5em" className="mx-auto mb-2" />
            <p className="leading-relaxed font-bold text-xl text-center">
              Reset Password
            </p>

            <p className="text-center leading-relaxed mb-8 text-black/60">
              Create a new password for your account.
            </p>
            {/* password */}
            <div className="flex border border-gray-300 mb-4 p-3 bg-white rounded-md overflow-hidden">
              <span className="inline-flex items-center px-3 text-gray-500 text-sm border-r-2 border-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-phone"
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
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <circle cx="12" cy="16" r="1" />
                  <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                </svg>
              </span>
              <input
                className="pl-3 w-full focus:outline-none"
                type={passwordType}
                placeholder="New Password"
                required
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
              <span className="scale-75 cursor-pointer flex items-center justify-center">
                {passwordType === 'password' ? (
                  <span
                    className="inline-flex items-center px-3 text-gray-500 text-sm"
                    onClick={(e) => {
                      setpasswordType('text');
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-phone"
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
                      <line x1="3" y1="3" x2="21" y2="21" />
                      <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                      <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                    </svg>
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center px-3 text-gray-500 text-sm"
                    onClick={(e) => {
                      setpasswordType('password');
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-phone"
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
                      <circle cx="12" cy="12" r="2" />
                      <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                    </svg>
                  </span>
                )}
              </span>
            </div>
            <div className="flex border border-gray-300 mb-4 p-3 bg-white rounded-md overflow-hidden">
              <span className="inline-flex items-center px-3 text-gray-500 text-sm border-r-2 border-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-phone"
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
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <circle cx="12" cy="16" r="1" />
                  <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                </svg>
              </span>
              <input
                className="pl-3 w-full focus:outline-none"
                type={confirmPasswordType}
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
              <span className="scale-75 cursor-pointer flex items-center justify-center">
                {confirmPasswordType === 'password' ? (
                  <span
                    className="inline-flex items-center px-3 text-gray-500 text-sm"
                    onClick={(e) => {
                      setconfirmPasswordType('text');
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-phone"
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
                      <line x1="3" y1="3" x2="21" y2="21" />
                      <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                      <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                    </svg>
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center px-3 text-gray-500 text-sm"
                    onClick={(e) => {
                      setconfirmPasswordType('password');
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-phone"
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
                      <circle cx="12" cy="12" r="2" />
                      <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                    </svg>
                  </span>
                )}
              </span>
            </div>
            <button
              className="w-full bg-blue text-white py-2 px-8 rounded cursor-pointer hover:bg-indigo-500 duration-500 focus:outline-none"
              type="submit"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
