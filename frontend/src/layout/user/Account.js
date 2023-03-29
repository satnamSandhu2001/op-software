import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import AccountDeleteModal from '../../components/AccountDeleteModal';
import UserSidebar from '../../components/UserSidebar';
import {
  clearDeleteUserState,
  clearErrors,
  clearUserState,
  deleteMyAccount,
  loadUser,
  resetProfile,
  updatePassword,
  updateProfile,
} from '../../store/actions/userAction';
import MetaData from '../../components/MetaData';

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, user, isAuthenticated } = useSelector((state) => state.user);
  const { error: profileError, isUpdated } = useSelector(
    (state) => state.profile
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteAccount
  );

  const [name, setname] = useState(user.name);
  const [disableUpdate, setdisableUpdate] = useState(true);
  const [password, setpassword] = useState('');
  const [passwordType, setpasswordType] = useState('password');
  const [oldPassword, setoldPassword] = useState('');
  const [oldPasswordType, setoldPasswordType] = useState('password');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [confirmPasswordType, setconfirmPasswordType] = useState('password');
  const [deleteDialog, setdeleteDialog] = useState(false);

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (name.length < 2) {
      return toast.warn('Name cannot be empty', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    dispatch(updateProfile({ name }));
  };
  const handleUpdatePasswordSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.warn("Password Doesn't Match ", {
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
      return toast.warn('Password must be greater than 8 Characters', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    let data = { oldPassword, newPassword: password, confirmPassword };
    dispatch(updatePassword(data));
  };

  const hideDeleteDialog = () => {
    setdeleteDialog(false);
  };
  const handleDeleteAccount = () => {
    dispatch(deleteMyAccount());
    setdeleteDialog(false);
  };

  useEffect(() => {
    if (error) {
      toast.warn(error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(clearErrors());
    }
    if (profileError) {
      toast.warn(profileError, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.warn(deleteError, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(clearErrors());
    }
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
    if (isUpdated) {
      toast.success('Profile Updated', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setdisableUpdate(true);
      dispatch(resetProfile());
      dispatch(loadUser());
      setpassword('');
      setoldPassword('');
      setconfirmPassword('');
    }
    if (isDeleted) {
      toast.success('Profile Updated', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(clearUserState());
      dispatch(clearDeleteUserState());
      navigate('/login', { replace: true });
    }
  }, [
    dispatch,
    isAuthenticated,
    navigate,
    error,
    isUpdated,
    isDeleted,
    deleteError,
    profileError,
  ]);

  return (
    <>
      <MetaData title={`OpSoftware - My Account`} />
      <ToastContainer />
      <div className="flex bg-gray-100">
        <UserSidebar activeTab="account" />
        {user && (
          <div className="pt-24 sm:pt-28 lg:pt-36 px-4 sm:px-12 lg:px-20 w-full">
            <div className="w-full grid grid-cols-1 lg:grid-cols-[2fr_4fr]">
              <div className="hidden lg:flex w-fit h-fit bg-white rounded-md shadow-soft-sm px-8 py-6 justify-between items-center flex-col mb-6">
                <p className="flex items-center justify-center text-6xl bg-blue text-white h-32 w-32 rounded-full uppercase">
                  {user.name && user.name.split('')[0]}
                </p>
                <p className="mt-3 pt-3 border-t-2 border-gray-200 lowercase">
                  @{user.name.replace(' ', '')}
                </p>
              </div>
              <div className="bg-white rounded-md shadow-soft-sm p-4 sm:px-8 sm:py-6 select-none">
                <h3 className="text-2xl sm:text-3xl">Account Data</h3>
                <form
                  onSubmit={handleUpdateSubmit}
                  className="py-6 max-w-lg select-none border-b-2 border-gray-300"
                >
                  {/* name */}
                  <div className="flex border px-2 py-4 sm:p-4 bg-white rounded-md overflow-hidden mb-4">
                    <span className="inline-flex items-center px-3 text-gray-500 text-sm border-r-2 border-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-user"
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
                        <circle cx="12" cy="7" r="4" />
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                      </svg>
                    </span>
                    <input
                      className="pl-3 w-full focus:outline-none"
                      type="text"
                      placeholder="Name"
                      name="name"
                      required
                      value={name}
                      onChange={(e) => {
                        setname(e.target.value);
                        setdisableUpdate(false);
                      }}
                    />
                  </div>
                  {/* email */}
                  <div className="flex border px-2 py-4 sm:p-4 bg-white rounded-md overflow-hidden mb-4 cursor-not-allowed">
                    <span className="inline-flex items-center px-3 text-gray-500 text-sm border-r-2 border-gray-300 cursor-not-allowed">
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
                      className="pl-3 w-full focus:outline-none cursor-not-allowed"
                      type="email"
                      placeholder="Email"
                      name="email"
                      required
                      disabled
                      value={user.email}
                    />
                  </div>
                  <div className="flex justify-end gap-x-4">
                    <button
                      className="bg-white text-black py-2 px-8 rounded cursor-pointer border border-gray-300 hover:bg-gray-50 duration-300"
                      type="button"
                      onClick={() => {
                        setname(user.name);
                        setdisableUpdate(true);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className={`bg-blue text-white py-2 px-8 rounded ${
                        disableUpdate
                          ? 'cursor-not-allowed'
                          : 'cursor-pointer hover:bg-indigo-700'
                      } duration-300`}
                      type="submit"
                      disabled={disableUpdate ? true : false}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
                <h3 className="text-2xl sm:text-3xl mt-6">Reset Password</h3>
                <form
                  onSubmit={handleUpdatePasswordSubmit}
                  className="py-6 max-w-lg select-none border-b-2 border-gray-300"
                >
                  {/* old pasword */}
                  <div className="flex border px-2 py-4 sm:p-4 bg-white rounded-md overflow-hidden mb-4">
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
                      type={oldPasswordType}
                      placeholder="Old Password"
                      required
                      value={oldPassword}
                      onChange={(e) => setoldPassword(e.target.value)}
                    />
                    <span className="scale-75 cursor-pointer flex items-center justify-center">
                      {oldPasswordType === 'password' ? (
                        <span
                          className="inline-flex items-center px-3 text-gray-500 text-sm"
                          onClick={(e) => {
                            setoldPasswordType('text');
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
                            setoldPasswordType('password');
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
                  {/* pasword */}
                  <div className="flex border px-2 py-4 sm:p-4 bg-white rounded-md overflow-hidden mb-4">
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
                  {/* confirm password */}
                  <div className="flex border px-2 py-4 sm:p-4 bg-white rounded-md overflow-hidden mb-4">
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
                      placeholder="Confirm New Password"
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
                  <div className="flex justify-end gap-x-4">
                    <button
                      className="bg-white text-black py-2 px-8 rounded cursor-pointer border border-gray-300 hover:bg-gray-50 duration-300"
                      type="button"
                      onClick={() => {
                        setoldPassword('');
                        setpassword('');
                        setconfirmPassword('');
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-blue text-white py-2 px-8 rounded cursor-pointer hover:bg-indigo-700 duration-300"
                      type="submit"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
                <h3 className="text-2xl sm:text-3xl mt-6">Other Actions</h3>
                <div className="py-6 max-w-lg select-none">
                  <button
                    className="bg-red-500 text-white py-2 px-8 rounded cursor-pointer hover:bg-red-600 duration-300"
                    type="button"
                    onClick={() => setdeleteDialog(true)}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {deleteDialog && (
        <AccountDeleteModal
          cancel={hideDeleteDialog}
          confirm={handleDeleteAccount}
        />
      )}
    </>
  );
};

export default Account;
