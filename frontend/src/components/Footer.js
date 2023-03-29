import React, { useEffect, useState } from 'react';
import { SiOpslevel } from 'react-icons/si';
import { MdWifiCalling2 } from 'react-icons/md';
import { BiMessageDetail } from 'react-icons/bi';
import { FiChevronsRight } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import footer_bg from '../images/footer-bg.png';

const Footer = () => {
  const location = useLocation();
  const [isHidden, setisHidden] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('panel')) {
      setisHidden(true);
    } else {
      setisHidden(false);
    }
  }, [location.pathname]);

  return (
    <footer className={`${isHidden && 'hidden'} relative pt-24 text-white`}>
      <div
        style={{ zIndex: -1, background: `url(${footer_bg}), #600ee4` }}
        className="bg-no-repeat bg-cover bg-center w-full h-full absolute top-0"
      ></div>
      <div className="container px-6 sm:px-0 mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div>
          <p className="flex gap-x-3 items-center font-semibold text-2xl text-center mb-6">
            <SiOpslevel strokeWidth={0.5} size="1.2em" /> OpSoftware
          </p>
          <p className="font-light">
            A simple solution for building the optimal work schedule for your
            business.
          </p>
          <div className="flex items-center mt-6 gap-3">
            <a
              href="/#"
              className="rounded-full p-1 group bg-transparent duration-500 border border-white hover:bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-brand-instagram text-white group-hover:text-blue duration-500"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <rect x="4" y="4" width="16" height="16" rx="4" />
                <circle cx="12" cy="12" r="3" />
                <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" />
              </svg>
            </a>
            <a
              href="https://wa.me/919371070002"
              target="blank"
              className="rounded-full p-1 group bg-transparent duration-500 border border-white hover:bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-brand-instagram text-white group-hover:text-blue duration-500"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                <path d="M9 10a0.5 .5 0 0 0 1 0v-1a0.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a0.5 .5 0 0 0 0 -1h-1a0.5 .5 0 0 0 0 1" />
              </svg>
            </a>
            <a
              href="/#"
              className="rounded-full p-1 group bg-transparent duration-500 border border-white hover:bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-brand-instagram text-white group-hover:text-blue duration-500"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
              </svg>
            </a>
            <a
              href="/#"
              className="rounded-full p-1 group bg-transparent duration-500 border border-white hover:bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-brand-instagram text-white group-hover:text-blue duration-500"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <line x1="8" y1="11" x2="8" y2="16" />
                <line x1="8" y1="8" x2="8" y2="8.01" />
                <line x1="12" y1="16" x2="12" y2="11" />
                <path d="M16 16v-3a2 2 0 0 0 -4 0" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <span className="text-xl pb-1 border-b-2 border-white">Explore</span>
          <ul className="mt-4">
            <li className="my-2 flex items-center gap-x-3">
              <FiChevronsRight />
              <HashLink
                smooth
                to="/#"
                className="w-max cursor-pointer capitalize border-b-2 border-transparent hover:border-white transition-all duration-300"
              >
                Home
              </HashLink>
            </li>
            <li className="my-2 flex items-center gap-x-3">
              <FiChevronsRight />
              <Link
                to="/contact"
                className="w-max cursor-pointer capitalize border-b-2 border-transparent hover:border-white transition-all duration-300"
              >
                contact
              </Link>
            </li>

            <li className="my-2 flex items-center gap-x-3">
              <FiChevronsRight />{' '}
              <Link
                to="/pricing"
                className="w-max cursor-pointer capitalize border-b-2 border-transparent hover:border-white transition-all duration-300"
              >
                Pricing
              </Link>
            </li>
            <li className="my-2 flex items-center gap-x-3">
              <FiChevronsRight />{' '}
              <Link
                to="/login"
                className="w-max cursor-pointer capitalize border-b-2 border-transparent hover:border-white transition-all duration-300"
              >
                Log In
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <span className="text-xl pb-1 border-b-2 border-white">Contact</span>
          <ul className="mt-4">
            <li className="my-2 flex gap-4 items-center">
              <BiMessageDetail size="1.2em" className="text-white" />
              <a
                href="mail:sam9814549070@gmail.com"
                className="w-max cursor-pointer font-light border-b-2 border-transparent hover:border-white transition-all duration-300"
              >
                sam9814549070@gmail.com
              </a>
            </li>

            <li className="my-2 flex gap-4 items-center">
              <MdWifiCalling2 size="1.2em" className="text-white" />
              <a
                href="tel:+919814549070"
                className="w-max cursor-pointer font-light capitalize border-b-2 border-transparent hover:border-white transition-all duration-300"
              >
                +91 9814-549-070
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 border-t border-white/30 py-8">
        <p className="text-center text-white/90">
          Designed & Developed by{' '}
          <a
            href="tel:+919371070002"
            className="text-white block sm:inline-block"
          >
            @Satnam Sandhu
          </a>{' '}
          - 2023
        </p>
      </div>
    </footer>
  );
};

export default Footer;
