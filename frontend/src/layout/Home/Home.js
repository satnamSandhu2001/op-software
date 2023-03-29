import React, { useEffect, useState } from 'react';
import breadcrumb_shape_2 from '../../images/breadcrumb-shape-2.png';
import hero_img_1 from '../../images/hero-img-3-1.png';
import svg_icon_1 from '../../images/sv-icon-3-1.png';
import service_3_bg from '../../images/service-3-bg.png';
import service_shape_3_1 from '../../images/service-shape-3-1.png';
import card_bg from '../../images/card-bg.png';
import card_shape_1 from '../../images/card-shape-1.png';
import card_img_1 from '../../images/card-img-1.png';
import card_img_4 from '../../images/card-img-4.png';
import sale_1 from '../../images/sale-1.png';
import sale_2 from '../../images/sale-2.png';
import sale_3 from '../../images/sale-3.png';
import home_bg from '../../images/home-bg.jpg';
import { SlLayers } from 'react-icons/sl';
import {
  BsArrowRight,
  BsCheck2Circle,
  BsFileEarmarkLock2,
} from 'react-icons/bs';
import { TbReportMoney } from 'react-icons/tb';
import { MdOutlineInventory } from 'react-icons/md';
import { CgFileDocument, CgWebsite } from 'react-icons/cg';
import { RiBankLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/actions/orderAction';
import { getSoftwares } from '../../store/actions/softwareActions';
import MetaData from '../../components/MetaData';

const Home = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { softwares } = useSelector((state) => state.software);
  const { isAuthenticated } = useSelector((state) => state.user);

  const [openTab, setopenTab] = useState(0);

  const handlebuySubscription = ({ item, softwareName, expiryTime }) => {
    let cartData = { item, softwareName, expiryTime };
    dispatch(addToCart(cartData));
    if (!isAuthenticated) {
      return navigate(`/login?redirect=payment`);
    } else {
      return navigate(`/payment`);
    }
  };

  useEffect(() => {
    dispatch(getSoftwares());
  }, [dispatch]);

  let featuresData = [
    {
      icon: <SlLayers className="text-blue" size="3em" stroke="none" />,
      title: 'gst features',
      desc: 'Prepares automated reports related to GST like GST3B, GSTR1, GSTR2, etc and allows users to easily calculate GST returns.',
    },
    {
      icon: (
        <TbReportMoney className="text-blue" size="3em" strokeWidth="1.4" />
      ),
      title: 'billing',
      desc: 'Allow users to generate invoices and bills quickly and easily. It should also allow users to customize the invoices with their payment terms and other relevant details.',
    },
    {
      icon: (
        <MdOutlineInventory className="text-blue" size="3em" strokeWidth="0" />
      ),
      title: 'inventory management',
      desc: 'Allow users to manage their inventory by tracking stock levels, recording purchases and sales, and generating reports on inventory levels.',
    },
    {
      icon: <CgFileDocument className="text-blue" size="3em" strokeWidth="0" />,
      title: 'financial reporting',
      desc: 'Provides users with financial reports such as balance sheets, profit and loss statements, and cash flow statements.',
    },
    {
      icon: <RiBankLine className="text-blue" size="3em" strokeWidth="0" />,
      title: 'Automated Data Entry',
      desc: 'Have the capability to automatically import data from bank statements and other sources, reducing manual data entry.',
    },
    {
      icon: (
        <BsFileEarmarkLock2 className="text-blue" size="3em" strokeWidth="0" />
      ),
      title: 'Security',
      desc: 'Robust security features to protect the data of the users, such as encryption, access control, and backups.',
    },
    {
      icon: <CgWebsite className="text-blue" size="3em" strokeWidth="0" />,
      title: 'user friendly interface',
      desc: 'User-friendly interface that is easy to navigate and use, even for those who are not experienced in accounting or technology',
    },
  ];

  return (
    <>
      <MetaData title={`OpSoftware`} />
      <div
        style={{
          backgroundImage: `url(${home_bg})`,
        }}
        className="relative bg-cover bg-no-repeat bg-center bg-blue"
      >
        <div className="container px-6 sm:px-0 min-h-screen mx-auto h-full flex items-center">
          <img
            src={breadcrumb_shape_2}
            alt=""
            className="absolute top-0 left-0 w-full h-screen"
          />
          <div className="z-0 h-20 sm:h-28 w-20 sm:w-28 rounded-full bg-indigo-300/50 absolute top-20 left-[-3%] animate-[moving_9s_linear_infinite]"></div>
          <div className="z-0 h-12 w-12 rounded-full bg-orange-300/50 absolute bottom-20 right-[50px] animate-[moving2_18s_linear_infinite]"></div>
          <div className="h-full w-full flex flex-col-reverse gap-y-8 md:flex-row items-center justify-center relative">
            <div className="absolute z-0 top-[30%] right-[20%] h-8 w-8 bg-emerald-400/30 rounded-full animate-[moving2_13s_linear_infinite] delay-700"></div>

            <div className="md:flex-[1.5] flex flex-col gap-4">
              <h1 className="text-white text-3xl leading-snug md:leading-snug md:text-5xl xl:text-6xl font-thin xl:leading-tight">
                Offer The Best{' '}
                <span className="inline-block text-yellow-500 relative font-bold">
                  Business{' '}
                  <svg
                    className="w-[102%] absolute -bottom-2 left-0"
                    height="12"
                    viewBox="0 0 300 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M275.982 1.4409C269.424 1.12484 262.867 0.892429 256.309 0.622849C254.145 0.529889 251.971 0.529918 249.807 0.483438C245.111 0.381188 240.414 0.288218 235.717 0.185959C233.104 0.130186 230.482 0.0651215 227.87 0.0186415C227.107 0.00934547 226.357 3.05176e-05 225.594 3.05176e-05C223.891 3.05176e-05 222.186 0.0185935 220.483 0.0278895C212.737 0.0371855 204.98 0.0464995 197.234 0.0464995C195.384 0.0464995 193.546 0.0836815 191.696 0.102274C187.122 0.148754 182.561 0.204559 177.998 0.251039C172.842 0.306819 167.696 0.325359 162.54 0.436918C154.2 0.604239 145.872 0.780908 137.531 0.948238C132.7 1.0505 127.88 1.10624 123.048 1.26427C114.731 1.54315 106.424 1.81274 98.1069 2.08232C93.567 2.23106 89.0159 2.35193 84.4759 2.56573C75.8782 2.96546 67.2803 3.35586 58.6825 3.75559C54.0866 3.9694 49.4906 4.12743 44.9058 4.45279C36.3417 5.05703 27.7888 5.66128 19.2246 6.26552C17.3749 6.39566 15.5254 6.52579 13.6758 6.65593C9.97655 6.91622 6.29982 7.32527 2.61185 7.66922C2.37644 7.69711 2.15225 7.72501 1.91685 7.7436C1.47968 7.84586 1.08733 8.03176 0.762257 8.30134C0.280242 8.70107 0 9.25882 0 9.82592C0 10.3929 0.280242 10.9507 0.762257 11.3597C1.19943 11.7222 1.96169 12.0569 2.61185 11.9919C7.06208 11.5735 11.5011 11.1366 15.9513 10.8206C20.0877 10.5324 24.2128 10.2349 28.3493 9.94672C32.8555 9.63072 37.3618 9.31462 41.8681 8.99854C43.684 8.86839 45.5 8.70109 47.3272 8.61743C54.3557 8.29207 61.3841 7.97597 68.4125 7.65061C72.7955 7.4461 77.1785 7.25092 81.5614 7.0464C83.3774 6.96274 85.1822 6.86047 86.9981 6.79539C93.9593 6.563 100.932 6.34917 107.893 6.13536C112.119 6.00522 116.333 5.86578 120.56 5.73564C121.983 5.68916 123.396 5.63337 124.819 5.60548C132.341 5.45675 139.863 5.31734 147.384 5.1779C151.588 5.09424 155.781 5.01986 159.985 4.9362C161.475 4.90831 162.977 4.86181 164.468 4.85251C172.225 4.78744 179.982 4.7224 187.739 4.65733C192.582 4.61085 197.413 4.57365 202.256 4.58295C210.495 4.60154 218.734 4.61082 226.962 4.62941C228.588 4.62941 230.213 4.68523 231.838 4.73171C236.389 4.84327 240.929 4.9548 245.481 5.06636C248.888 5.15002 252.296 5.23364 255.715 5.31731C258.136 5.37308 260.546 5.52184 262.967 5.6334C270.085 5.94946 277.204 6.28414 284.311 6.64668C286.115 6.73964 287.92 6.85116 289.725 6.96272C291.664 7.07427 293.603 7.19512 295.531 7.37174C295.834 7.40893 296.125 7.45543 296.428 7.5112C297.191 7.64135 297.919 7.60416 298.603 7.2788C299.231 6.97204 299.701 6.46075 299.903 5.8751C300.307 4.64803 299.41 3.33726 297.93 2.99331C296.63 2.69584 295.284 2.57504 293.951 2.46349C293.032 2.38912 292.124 2.30546 291.204 2.23109C289.445 2.08236 287.674 2.00794 285.913 1.89639C282.607 1.71977 279.289 1.59893 275.982 1.4409Z"
                      fill="rgb(234, 179, 8, 1)"
                    ></path>
                  </svg>
                </span>{' '}
                <span className="font-bold">Management</span> With Software
              </h1>
              <p className="text-white md:text-lg">
                A simple solution for building the optimal work
                <br />
                schedule for your business.
              </p>
              <Link
                to="/subscriptions"
                className="font-semibold w-fit text-black bg-white rounded-full px-7 py-3 transition-all duration-500 ease-linear hover:scale-105 flex items-center gap-x-1"
              >
                Download
              </Link>
            </div>
            <div className="md:flex-1">
              <img src={hero_img_1} alt="" className="mt-6 sm:mt-0" />
            </div>
          </div>
        </div>
      </div>

      {/* features */}
      <section
        id="features"
        className="container px-6 sm:px-0 mx-auto pt-24 pb-16"
      >
        <div className="flex justify-between flex-wrap items-center mb-8">
          <h1 className="leading-snug md:leading-snug font-Urbanist text-3xl md:text-5xl font-bold">
            Accounting Software
            <br />
            That Handles it All.
          </h1>
          <span className="text-lg font-semibold text-white bg-blue rounded-3xl mt-4 px-7 py-2">
            All Features
          </span>
        </div>

        <div className="flex flex-wrap items-stretch justify-between gap-8">
          <div
            style={{
              backgroundImage: `url(${service_3_bg})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'left top',
            }}
            className="p-8 md:p-10 rounded-3xl overflow-hidden shadow-[2px_2px_20px_rgba(0,0,0,0.15)] w-full lg:max-w-[50%] xl:max-w-[60%] relative"
          >
            <img src={svg_icon_1} alt="" className="w-12" />
            <div className="text-white mt-14">
              <p className="font-medium text-xs">BUSINESS MANAGEMENT</p>
              <p className="font-bold text-2xl">
                Manage all your Accounting needs through one simple, easy-to-use
                software
              </p>
              <button className="mt-6 text-sm font-semibold w-fit text-white bg-white/30 rounded-full px-5 py-2 transition-all duration-500 ease-linear hover:scale-105 flex items-center gap-x-1">
                Learn More
              </button>
            </div>
            <img
              src={service_shape_3_1}
              alt=""
              className="absolute right-0 bottom-0 mix-blend-soft-light"
            />
          </div>
          {featuresData?.length !== 0 &&
            featuresData.map((item) => {
              return (
                <div
                  key={item.title}
                  className="w-full md:max-w-[350px] lg:max-w-[450px] xl:max-w-[350px] flex flex-col justify-between p-8 md:p-10 rounded-3xl shadow-[2px_2px_20px_rgba(0,0,0,0.15)] group relative cursor-pointer overflow-hidden"
                >
                  {item.icon}
                  {/* full text */}
                  <div className="bg-indigo-100 delay-[400ms] scale-50 translate-y-20 group-hover:scale-100 opacity-0 group-hover:opacity-100 duration-500 p-6 rounded-3xl w-[95%] h-[95%] absolute top-1/2 left-1/2 transform -translate-x-1/2 group-hover:-translate-y-1/2 flex items-center justify-center text-blue">
                    <p className="font-semibold text-lg text-center">
                      {item.desc}
                    </p>
                  </div>
                  <div className="transition-all mt-16">
                    <p className="font-medium text-xs uppercase">
                      {item.title}
                    </p>
                    <p
                      className="font-bold text-lg mt-4"
                      style={{
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitLineClamp: '3',
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {item.desc}
                    </p>
                    <button className="text-sm font-semibold flex items-center gap-2 relative -z-10 mt-2 text-blue">
                      Read More{' '}
                      <BsArrowRight className="animate-[movingX_2s_linear_infinite]" />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* manage business */}
      <section className="bg-indigo-100 md:pb-24">
        <div className="container px-6 sm:px-0 mx-auto py-16 grid gap-x-16 lg:gap-x-28 gap-y-4 grid-cols-1 md:grid-cols-2 justify-evenly items-start">
          <div
            style={{
              backgroundImage: `url(${card_bg})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'left top',
            }}
            className="relative rounded-3xl max-w-md mx-auto mb-[20%] md:mb-0"
          >
            <img
              src={card_shape_1}
              alt=""
              className="w-20 absolute -top-10 left-5 animate-[spin_9s_linear_infinite]"
            />
            <img
              src={card_img_4}
              alt=""
              className="mt-[20%] float-right mr-8 w-24 animate-[movingXlarge_5s_linear_infinite]"
            />
            <img src={card_img_1} alt="" className=" -mb-[30%]" />
          </div>
          <div>
            {' '}
            <h3 className="mb-2 text-left leading-tight md:leading-tight font-Urbanist text-3xl md:text-5xl font-bold">
              Manage all your Business in one Place.
            </h3>
            <p className="text-left leading-relaxed">
              Our software makes it simple to keep track of sales, inventory,
              and customer information in real time. You can then streamline
              your operations for maximum efficiency and make well-informed
              decisions.
            </p>
            <Link
              to="/pricing"
              className="mt-4 font-semibold w-fit text-white bg-blue rounded-full px-7 py-3 transition-colors hover:bg-indigo-600 duration-300 flex items-center gap-x-1"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* track and analyse */}
      <section className="md:pb-24">
        <div className="container px-6 sm:px-0 mx-auto py-16 grid gap-x-16 lg:gap-x-28 gap-y-8 grid-cols-1  grid-flow-dense md:grid-cols-2 justify-evenly items-center">
          <div>
            <h3 className="mb-2 text-left leading-tight md:leading-tight font-Urbanist text-3xl md:text-5xl font-bold">
              Track and Analyze Sales in Real time.
            </h3>
            <p className="leading-relaxed">
              Centralize and simplify payments, and get comprehensive insights
              on your financials softuch.!
            </p>
            <ul className="mt-6">
              <li className="flex items-center gap-x-2 text-sm font-semibold my-3 px-3 py-1 text-yellow-500 rounded-3xl w-fit bg-gradient-to-r from-yellow-100 to-transparent">
                <BsCheck2Circle /> No Hidden Fees.
              </li>
              <li className="flex items-center gap-x-2 text-sm font-semibold my-3 px-3 py-1 text-indigo-500 rounded-3xl w-fit bg-gradient-to-r from-indigo-100 to-transparent">
                <BsCheck2Circle /> 100% security Guaranteed
              </li>
              <li className="flex items-center gap-x-2 text-sm font-semibold my-3 px-3 py-1 text-green-500 rounded-3xl w-fit bg-gradient-to-r from-green-100 to-transparent">
                <BsCheck2Circle /> No training or maintenance needed
              </li>
            </ul>
          </div>
          <div className="relative rounded-3xl max-w-md mx-auto mb-[20%] md:mb-0">
            <img src={sale_1} alt="" />
            <img
              src={sale_3}
              alt=""
              className="-z-10 w-20 absolute top-16 rotate-180 -left-5 animate-[movingSpin_9s_linear_infinite]"
            />
            <img
              src={sale_2}
              alt=""
              className="absolute bottom-10 left-0 sm:-left-10 animate-[movingY_1s_alternate_infinite] drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* pricing */}
      {softwares && softwares.length !== 0 && (
        <section className="bg-indigo-100 py-16">
          <div className="container p-6 mx-4 sm:px-8 sm:py-8 sm:mx-auto">
            <div className="mb-8">
              <h3 className="mx-auto max-w-2xl text-center leading-snug md:leading-snug font-Urbanist text-3xl md:text-5xl font-bold">
                Deliver{'  '}
                <span className="text-blue inline-block"> End-To-End</span>{' '}
                Retail Billing & Solutions
              </h3>
              <p className="text-center font-semibold mt-2">
                Choose a plan tailored to your needs
              </p>
            </div>
            <div className="rounded-3xl bg-white overflow-hidden">
              {softwares?.map((product, i) => {
                return (
                  <div key={i}>
                    <div className="rounded-t-lg border border-neutral-200 bg-white">
                      <h2 className="mb-0">
                        <button
                          className="group relative flex w-full items-center rounded-t-[15px] border-0 bg-white py-4 px-5 text-left text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none text-xl font-semibold"
                          type="button"
                          onClick={() => setopenTab(i)}
                        >
                          {product.name}
                          <span
                            className={`ml-auto h-5 w-5 shrink-0 ${
                              openTab === i ? 'rotate-[-180deg]' : 'rotate-0'
                            } transition-none`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-6 w-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                              />
                            </svg>
                          </span>
                        </button>
                      </h2>
                      <div
                        className={`visible overflow-hidden transition-transform origin-top duration-500 ease-out ${
                          openTab === i ? 'scale-y-100 h-full' : 'scale-y-0 h-0'
                        }`}
                      >
                        <div
                          className={`py-4 px-5 grid gap-8 ${
                            window.innerWidth < 640
                              ? 'grid-cols-1'
                              : window.innerWidth < 768
                              ? 'grid-cols-2'
                              : product.item.length > 3
                              ? 'grid-cols-3'
                              : 'grid-cols-' + product.item.length
                          }`}
                        >
                          {product.item.map((item, key) => {
                            let expMs = item.expiryTime;
                            let year, month, day, hour, minute, second;
                            second = Math.floor(expMs / 1000);
                            minute = Math.floor(second / 60);
                            second = second % 60;
                            hour = Math.floor(minute / 60);
                            minute = minute % 60;
                            day = Math.floor(hour / 24);
                            hour = hour % 24;
                            month = Math.floor(day / 30);
                            day = day % 30;
                            year = Math.floor(month / 12);
                            month = month % 12;

                            return (
                              <div
                                key={key}
                                className="bg-indigo-100 rounded-3xl px-6 py-8 flex flex-col justify-between"
                              >
                                <div>
                                  <h3 className="font-Urbanist tracking-wide uppercase text-base text-center font-bold">
                                    {item.name}
                                  </h3>
                                  <p className="text-center text-black/60 font-semibold leading-snug my-2">
                                    {item.description}
                                  </p>
                                  <p className="font-Urbanist mt-6 text-center text-5xl font-semibold">
                                    ₹ {item.price}
                                  </p>
                                  <p className="text-center text-black/60 font-semibold leading-snug mt-3">
                                    {year !== 0 && year + ' Year'}{' '}
                                    {month !== 0 && month + ' Month'}
                                  </p>
                                </div>
                                <button
                                  className="mt-6 mx-auto font-semibold w-fit text-white bg-blue rounded-full px-7 py-3 transition-all duration-300 ease-linear hover:bg-indigo-600 hover:scale-105 flex items-center gap-x-1 focus:outline-none"
                                  type="button"
                                  onClick={() =>
                                    handlebuySubscription({
                                      item: item,
                                      softwareName: product.name,
                                      expiryTime: `  ${
                                        year !== 0 ? year + ' Year ' : ''
                                      }
                                  ${month !== 0 ? month + ' Month' : ''}`,
                                    })
                                  }
                                >
                                  Get Started
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
