import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  login,
  clearErrors,
  register,
  resetStateForgotPassword,
} from '../store/actions/userAction';
import { toast, ToastContainer } from 'react-toastify';
import Img_1 from '../images/login-1.png';
import Img_2 from '../images/login-2.png';
import Img_3 from '../images/login-3.png';
import shape_1 from '../images/login-shape-1.png';
import shape_2 from '../images/login-shape-2.png';
import ForgotPassword from '../components/ForgotPassword';
import MetaData from '../components/MetaData';

const LoginSignup = () => {
  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector((state) => state.user);
  const { error: forgotError, message: forgotMessage } = useSelector(
    (state) => state.forgotPassword
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const [loginEmail, setloginEmail] = useState('');
  const [loginPassword, setloginPassword] = useState('');
  const [loginPasswordType, setloginPasswordType] = useState('password');
  const [userDetails, setuserDetails] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [registerPasswordType, setregisterPasswordType] = useState('password');
  const { name, email, password } = userDetails;
  const [showForgotModal, setshowForgotModal] = useState(false);

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    let userData = {
      name,
      email,
      password,
    };
    dispatch(register(userData));
  };

  const redirect = location.search
    ? `/${location.search.split('redirect=')[1]}`
    : '/panel/account';
  // console.log(location.search);
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
    if (isAuthenticated === true) {
      navigate(redirect);
    }
    if (forgotError) {
      toast.warn(forgotError, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(resetStateForgotPassword());
    }
    if (forgotMessage) {
      toast.info(forgotMessage, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(resetStateForgotPassword());
    }
  }, [
    error,
    dispatch,
    isAuthenticated,
    navigate,
    redirect,
    forgotError,
    forgotMessage,
  ]);

  const switchTabs = (e, tab) => {
    if (tab === 'login') {
      switcherTab.current.classList.add('translate-x-[0%]');
      switcherTab.current.classList.remove('translate-x-[100%]');

      loginTab.current.classList.add('translate-x-[0%]', 'scale-100');
      loginTab.current.classList.remove('-translate-x-[100%]', 'scale-0');

      registerTab.current.classList.add('translate-x-[100%]', 'scale-0');
      registerTab.current.classList.remove('translate-x-[0%]', 'scale-100');
    }
    if (tab === 'register') {
      switcherTab.current.classList.add('translate-x-[100%]');
      switcherTab.current.classList.remove('translate-x-[0%]');

      loginTab.current.classList.add('-translate-x-[100%]', 'scale-0');
      loginTab.current.classList.remove('translate-x-[0%]', 'scale-100');

      registerTab.current.classList.add('translate-x-[0%]', 'scale-100');
      registerTab.current.classList.remove('translate-x-[100%]', 'scale-0');
    }
  };

  const registerDataChange = (e) => {
    setuserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  return (
    <>
      <MetaData title={`OpSoftware - LogIn SignUp`} />
      <ToastContainer />
      <div className="min-h-[90vh] container pt-28 pb-16 px-6 sm:px-0 mx-auto grid grid-cols-1 md:grid-cols-[3fr_4fr] items-center">
        <div className="flex overflow-hidden login_bg h-full rounded-t-xl md:rounded-r-none md:rounded-l-3xl relative flex-col items-center">
          <img
            src={shape_1}
            alt=""
            className="absolute bottom-0 left-0 z-0 opacity-70"
          />
          <img
            src={Img_1}
            alt=""
            className="rounded-md absolute top-10 left-10 sm:left-28 md:left-10 "
          />
          <img
            src={Img_2}
            alt=""
            className="rounded-md absolute top-20 right-10 sm:right-36 md:right-20 w-52 lg:w-56 "
          />
          <img
            src={Img_3}
            alt=""
            className="rounded-md absolute top-32 md:top-40 right-24 md:right-10 hidden sm:inline-block"
          />
          <img src={shape_2} alt="" className="z-10 mt-[25%] md:mt-[40%]" />
        </div>
        <div className="bg-slate-200 py-6 px-3 rounded-b-xl md:rounded-r-3xl sm:rounded-l-none h-full w-full flex items-center justify-center">
          <div className="bg-white w-80 h-[440px] pb-16 pt-2 rounded-md overflow-hidden">
            <div>
              <div className="grid grid-cols-2 items-center text-center">
                <p
                  className="text-lg py-2 tracking-wider cursor-pointer"
                  onClick={(e) => {
                    switchTabs(e, 'login');
                  }}
                >
                  LOGIN
                </p>
                <p
                  className="text-lg py-2 tracking-wider cursor-pointer"
                  onClick={(e) => {
                    switchTabs(e, 'register');
                  }}
                >
                  REGISTER
                </p>
              </div>
              <div
                ref={switcherTab}
                className="h-[2px] transition-transform duration-300 rounded-full bg-blue w-1/2 translate-x-[0%]"
              ></div>
            </div>
            <form
              ref={loginTab}
              onSubmit={loginSubmit}
              className="scale-100 px-5 flex flex-col justify-evenly h-full transition-transform duration-500"
            >
              {/* login email */}
              <div className="flex border p-3 bg-white rounded-md overflow-hidden">
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
                  value={loginEmail}
                  onChange={(e) => setloginEmail(e.target.value)}
                />
              </div>
              {/* login password */}
              <div className="flex border p-3 bg-white rounded-md overflow-hidden">
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
                  type={loginPasswordType}
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) => setloginPassword(e.target.value)}
                />
                <span className="scale-75 cursor-pointer flex items-center justify-center">
                  {loginPasswordType === 'password' ? (
                    <span
                      className="inline-flex items-center px-3 text-gray-500 text-sm"
                      onClick={(e) => {
                        setloginPasswordType('text');
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
                        setloginPasswordType('password');
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
              <p
                onClick={() => setshowForgotModal(true)}
                className="cursor-pointer text-right text-sm text-gray-600"
              >
                Forget Password ?
              </p>
              <input
                className="bg-blue text-white py-3 rounded cursor-pointer hover:bg-indigo-700 duration-300"
                type="submit"
                value="Login"
              />
            </form>
            <form
              ref={registerTab}
              onSubmit={registerSubmit}
              className="scale-0 px-5 flex flex-col justify-evenly h-full -translate-y-[100%] translate-x-[100%] transition-transform duration-500"
            >
              {/* register name */}
              <div className="flex border p-3 bg-white rounded-md overflow-hidden">
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
                    registerDataChange(e);
                  }}
                />
              </div>
              <div className="flex border p-3 bg-white rounded-md overflow-hidden">
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
                  onChange={(e) => {
                    registerDataChange(e);
                  }}
                />
              </div>
              {/* login password */}
              <div className="flex border p-3 bg-white rounded-md overflow-hidden">
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
                  type={registerPasswordType}
                  placeholder="Password"
                  required
                  name="password"
                  value={password}
                  onChange={(e) => {
                    registerDataChange(e);
                  }}
                />
                <span className="scale-75 cursor-pointer flex items-center justify-center">
                  {registerPasswordType === 'password' ? (
                    <span
                      className="inline-flex items-center px-3 text-gray-500 text-sm"
                      onClick={(e) => {
                        setregisterPasswordType('text');
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
                        setregisterPasswordType('password');
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

              <input
                className="bg-blue text-white py-3 rounded cursor-pointer hover:bg-indigo-700 duration-300"
                type="submit"
                value="Register"
              />
            </form>
          </div>
        </div>
      </div>
      {showForgotModal && (
        <ForgotPassword cancel={() => setshowForgotModal(false)} />
      )}
    </>
  );
};

export default LoginSignup;
