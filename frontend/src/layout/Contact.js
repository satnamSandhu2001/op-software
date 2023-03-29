import React, { useState } from 'react';
import { BsSendFill } from 'react-icons/bs';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import card_img_4 from '../images/card-img-4.png';
import contact_icon_sm_2 from '../images/contact-icon-sm-2.png';
import contact_icon_sm_1 from '../images/contact-icon-sm-1.png';
import axios from 'axios';
import { toast } from 'react-toastify';
import { loadingFalse, loadingTrue } from '../store/actions/orderAction';
import MetaData from '../components/MetaData';

const Contact = () => {
  const dispatch = useDispatch();
  const [formData, setformData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleInput = (e) => {
    if (e.target.name === 'phone') {
      e.target.value = e.target.value.toString().slice(0, 10);
      e.target.value = parseInt(e.target.value);
    }
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loadingTrue());
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post(
        '/api/v1/contact-form',
        formData,
        config
      );
      toast.success(data.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setformData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      dispatch(loadingFalse());
    }
  };

  return (
    <>
      <MetaData title={`OpSoftware - Contact Us`} />
      <ToastContainer />
      <div className="min-h-screen pt-32 pb-16 container px-6 sm:px-0 mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4">
        <div>
          <p className="text-xs text-blue font-bold">CONTACT US</p>

          <h3 className="my-2 text-left leading-tight sm:leading-tight font-Urbanist text-4xl sm:text-5xl font-bold">
            <span>
              {' '}
              We'd love to <br /> hear From
            </span>{' '}
            <BsSendFill className="text-blue inline-block" size="0.8em" />{' '}
            <span>you.</span>
          </h3>
          <p className="text-black/50 font-semibold leading-relaxed">
            While we're good with smoke signals, there
            <br /> are easier ways to get in touch.
          </p>

          <div className="mt-4 sm:mt-10 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-6">
            <div>
              <div className="">
                <div>
                  <a
                    href="mail:sam9814549070@gmail.com"
                    className="w-max cursor-pointer font-light border-b-2 border-transparent hover:border-white transition-all duration-300 flex gap-3 mt-3"
                  >
                    <img src={contact_icon_sm_1} alt="" className="w-10" />
                    sam9814549070@gmail.com
                  </a>
                  <a
                    href="tel:+919814549070"
                    className="w-max cursor-pointer font-light border-b-2 border-transparent hover:border-white transition-all duration-300 flex gap-3 mt-3"
                  >
                    <img src={contact_icon_sm_2} alt="" className="w-10" />
                    +91 9814-549-070
                  </a>
                </div>
              </div>
              <div className="flex items-center mt-6 gap-3">
                <a
                  href="/#"
                  className="rounded-full p-2 group duration-500 border-2 bg-transparent hover:bg-blue"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-brand-instagram group-hover:text-white text-blue duration-500"
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
                  className="rounded-full p-2 group duration-500 border-2 bg-transparent hover:bg-blue"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-brand-instagram group-hover:text-white text-blue duration-500"
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
                  className="rounded-full p-2 group duration-500 border-2 bg-transparent hover:bg-blue"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-brand-instagram group-hover:text-white text-blue duration-500"
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
                  className="rounded-full p-2 group duration-500 border-2 bg-transparent hover:bg-blue"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-brand-instagram group-hover:text-white text-blue duration-500"
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
            <img
              src={card_img_4}
              alt=""
              className="hidden sm:inline-block max-w-[150px]"
            />
          </div>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-bold text-black/60"
            >
              Name
            </label>
            <input
              value={formData.name}
              onChange={(e) => {
                handleInput(e);
              }}
              required
              type="text"
              maxLength={50}
              placeholder="Full Name"
              name="name"
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg  sm:text-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-bold text-black/60"
            >
              Email
            </label>
            <input
              value={formData.email}
              onChange={(e) => {
                handleInput(e);
              }}
              required
              maxLength={70}
              type="email"
              placeholder="Your Email"
              name="email"
              className="block w-full p-4 text-black border border-gray-300 rounded-lg  sm:text-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-bold text-black/60"
            >
              Phone
            </label>
            <input
              value={formData.phone}
              onChange={(e) => {
                handleInput(e);
              }}
              required
              maxLength={10}
              type="number"
              placeholder="Your Mobile No."
              name="phone"
              className="block w-full p-4 text-black border border-gray-300 rounded-lg  sm:text-md focus:ring-indigo-500 focus:border-amber-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-bold text-black/60"
            >
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => {
                handleInput(e);
              }}
              required
              maxLength={400}
              placeholder="Your Message Here..."
              name="message"
              className="block w-full p-4 text-black border border-gray-300 rounded-lg  sm:text-md focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="mb-6 font-semibold w-full text-center text-white bg-blue rounded-xl px-7 py-4 transition-colors hover:bg-indigo-600 duration-300"
          >
            Submit your Request
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
