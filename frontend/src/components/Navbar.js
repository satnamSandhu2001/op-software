import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RiLogoutCircleRLine, RiUserLine } from 'react-icons/ri';
import { SiOpslevel } from 'react-icons/si';
import { AiFillCloseSquare } from 'react-icons/ai';
import {
  BsFacebook,
  BsInstagram,
  BsTelegram,
  BsWhatsapp,
} from 'react-icons/bs';
import {} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/actions/userAction';
import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
  const [color, setcolor] = useState(false);
  const mobileNavRef = useRef('');
  const [transparent, settransparent] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleLogout = () => dispatch(logout());

  const changeColor = () => {
    if (window.scrollY >= 170) {
      setcolor(true);
    } else {
      setcolor(false);
    }
  };

  const toogleMobileNav = () => {
    if (mobileNavRef.current) {
      if (mobileNavRef.current.classList.contains('translate-x-full')) {
        mobileNavRef.current.classList.remove(
          'translate-x-full',
          'shadow-none'
        );
        mobileNavRef.current.classList.add(
          'translate-x-0',
          'shadow-outer-left'
        );
      } else {
        mobileNavRef.current.classList.remove(
          'translate-x-0',
          'shadow-outer-left'
        );
        mobileNavRef.current.classList.add('translate-x-full', 'shadow-none');
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeColor);
    if (
      location.pathname === '/' ||
      location.pathname === '/#' ||
      location.pathname === '' ||
      location.pathname.includes('password/reset') ||
      location.pathname.includes('/payment') ||
      location.pathname.includes('/pricing')
    ) {
      settransparent(true);
    } else {
      settransparent(false);
    }
    return () => {
      window.removeEventListener('scroll', changeColor);
    };
  }, [location.pathname]);

  return (
    <nav
      className={`z-50 select-none ${
        color || transparent === false ? 'shadow-bottom-nav' : 'shadow-none'
      } fixed top-0 w-full transition-all duration-500 ease-linear ${
        color
          ? 'bg-white text-black'
          : transparent === false
          ? 'bg-white text-black'
          : 'bg-transparent text-white'
      }`}
    >
      <div className="hidden lg:flex container mx-auto justify-between py-6">
        <div className="font-medium flex leading-none gap-x-8 group">
          <Link
            to="/#"
            className="flex items-center gap-x-3 leading-none font-semibold text-2xl mr-6"
          >
            <SiOpslevel strokeWidth={0.5} size="1.2em" /> OpSoftware
          </Link>
          <HashLink
            smooth
            to="/#"
            className={`cursor-pointer px-1 py-3 transition-border duration-500 ease-linear border-b-2 border-transparent ${
              color
                ? 'hover:border-blue'
                : transparent === false
                ? 'hover:border-black'
                : 'hover:border-white'
            }`}
          >
            Home
          </HashLink>

          <Link
            to="/pricing"
            className={`cursor-pointer px-1 py-3 transition-border duration-500 ease-linear border-b-2 border-transparent ${
              color
                ? 'hover:border-blue'
                : transparent === false
                ? 'hover:border-black'
                : 'hover:border-white'
            }`}
          >
            Pricing
          </Link>
          <HashLink
            smooth
            to="/#features"
            className={`cursor-pointer px-1 py-3 transition-border duration-500 ease-linear border-b-2 border-transparent ${
              color
                ? 'hover:border-blue'
                : transparent === false
                ? 'hover:border-black'
                : 'hover:border-white'
            }`}
          >
            Features
          </HashLink>
          <Link
            to="/contact"
            className={`cursor-pointer px-1 py-3 transition-border duration-500 ease-linear border-b-2 border-transparent ${
              color
                ? 'hover:border-blue'
                : transparent === false
                ? 'hover:border-black'
                : 'hover:border-white'
            }`}
          >
            Contact
          </Link>
        </div>
        <div className="font-medium leading-none flex gap-x-8">
          {isAuthenticated ? (
            <p
              onClick={() => {
                handleLogout();
                toogleMobileNav();
                navigate('/login');
              }}
              className="cursor-pointer px-1 py-3 transition-transform duration-300 ease-linear hover:scale-105 flex items-center gap-x-1"
            >
              <RiLogoutCircleRLine size="1.1em" />
              Log Out
            </p>
          ) : (
            <Link
              to={isAuthenticated ? '/panel/account' : '/login'}
              className="px-1 py-3 transition-transform duration-300 ease-linear hover:scale-105 flex items-center gap-x-1"
            >
              <RiUserLine size="1.1em" />
              Log In
            </Link>
          )}

          <Link
            to={isAuthenticated ? '/panel/account' : '/pricing'}
            className={`${
              color
                ? 'bg-black text-white'
                : transparent === false
                ? 'bg-black text-white'
                : 'text-black bg-white'
            } rounded-full px-7 py-3 transition-all duration-300 ease-linear hover:scale-105 flex items-center gap-x-1`}
          >
            {isAuthenticated ? (
              <>
                <RiUserLine size="1.1em" /> My Account
              </>
            ) : (
              'Get Started'
            )}
          </Link>
        </div>
      </div>
      <div className="relative lg:hidden">
        <div className="container px-6 sm:px-0 mx-auto">
          <div className="py-6 flex justify-between ">
            <Link
              to="/#"
              className="flex items-center leading-none gap-x-3 font-semibold text-2xl mr-6"
            >
              <SiOpslevel strokeWidth={0.5} size="1.2em" /> OpSoftware
            </Link>
            <div
              onClick={toogleMobileNav}
              className="flex flex-col gap-2 cursor-pointer"
            >
              <span
                className={`w-9 h-1 ${
                  color
                    ? 'bg-[#000229]'
                    : transparent === false
                    ? 'bg-[#000229]'
                    : 'bg-white'
                } rounded-full`}
              ></span>
              <span
                className={`w-9 h-1 ${
                  color
                    ? 'bg-[#000229]'
                    : transparent === false
                    ? 'bg-[#000229]'
                    : 'bg-white'
                } rounded-full`}
              ></span>
              <span
                className={`w-9 h-1 ${
                  color
                    ? 'bg-[#000229]'
                    : transparent === false
                    ? 'bg-[#000229]'
                    : 'bg-white'
                } rounded-full`}
              ></span>
            </div>
            <div
              ref={mobileNavRef}
              className="translate-x-full transition-transform duration-500 absolute min-w-[270px] shadow-none rounded-bl-3xl right-0 top-0 text-white bg-[#000229]"
            >
              <div className="relative">
                <div
                  className="absolute right-0 cursor-pointer"
                  onClick={toogleMobileNav}
                >
                  <AiFillCloseSquare size="2.5em" />
                </div>
                <div className="font-medium flex flex-col leading-none gap-x-8 group p-6">
                  <p className="flex gap-x-3 items-center font-semibold text-2xl text-center mb-6">
                    <SiOpslevel strokeWidth={0.5} size="1.2em" /> OpSoftware
                  </p>
                  <HashLink
                    smooth
                    to="/#"
                    onClick={toogleMobileNav}
                    className="px-1 py-4 transition-border duration-500 ease-linear border-b-2 border-white/10 hover:border-blue"
                  >
                    Home
                  </HashLink>
                  <Link
                    onClick={toogleMobileNav}
                    to="/pricing"
                    className="px-1 py-4 transition-border duration-500 ease-linear border-b-2 border-white/10 hover:border-blue"
                  >
                    Pricing
                  </Link>
                  <HashLink
                    smooth
                    to="/#features"
                    onClick={toogleMobileNav}
                    className="px-1 py-4 transition-border duration-500 ease-linear border-b-2 border-white/10 hover:border-blue"
                  >
                    Features
                  </HashLink>{' '}
                  <Link
                    onClick={toogleMobileNav}
                    to="/contact"
                    className="px-1 py-4 transition-border duration-500 ease-linear border-b-2 border-white/10 hover:border-blue"
                  >
                    Contact
                  </Link>
                  {isAuthenticated ? (
                    <p
                      onClick={() => {
                        handleLogout();
                        toogleMobileNav();
                        navigate('/login');
                      }}
                      className="cursor-pointer px-1 py-4 transition-border duration-500 ease-linear border-b-2 border-white/10 hover:border-blue flex items-center gap-x-1"
                    >
                      <RiLogoutCircleRLine size="1.1em" />
                      Log Out
                    </p>
                  ) : (
                    <Link
                      onClick={toogleMobileNav}
                      to="/login"
                      className="px-1 py-4 transition-border duration-500 ease-linear border-b-2 border-white/10 hover:border-blue flex items-center gap-x-1"
                    >
                      <RiUserLine size="1.1em" />
                      Log In
                    </Link>
                  )}
                  <Link
                    onClick={toogleMobileNav}
                    to={isAuthenticated ? '/panel/account' : '/pricing'}
                    className="font-bold text-black bg-white rounded-full px-5 py-4 my-3 transition-all duration-500 ease-linear hover:scale-105 flex items-center gap-x-1"
                  >
                    {isAuthenticated ? (
                      <>
                        <RiUserLine size="1.1em" />
                        My Account
                      </>
                    ) : (
                      'Get Started'
                    )}
                  </Link>
                  <p className="font-semibold text-lg text-center mb-2">
                    Get In Touch
                  </p>
                  <a
                    href="tel:919814549070"
                    className="text-center text-white/50"
                  >
                    9814-549-070
                  </a>
                  <div className="flex justify-center gap-x-3 py-6">
                    <div className="bg-white p-3 rounded-md text-[#000229]">
                      <BsInstagram />
                    </div>
                    <div className="bg-white p-3 rounded-md text-[#000229]">
                      <BsTelegram />
                    </div>
                    <div className="bg-white p-3 rounded-md text-[#000229]">
                      <BsWhatsapp />
                    </div>
                    <div className="bg-white p-3 rounded-md text-[#000229]">
                      <BsFacebook />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
