import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RiDeleteBin2Fill, RiEdit2Fill, RiUpload2Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import UserSidebar from '../../components/UserSidebar';
import { loadingFalse, loadingTrue } from '../../store/actions/orderAction';
import exclamation_video from '../../video/exclamation-mark.mp4';
import MetaData from '../../components/MetaData';

const SuscriptionsAdmin = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openTab, setopenTab] = useState(0);
  const [subscriptions, setsubscriptions] = useState([]);

  const getSubscriptions = async () => {
    try {
      dispatch(loadingTrue());
      const { data } = await axios.get('/api/v1/subscriptions');
      setsubscriptions([...data.subscriptions]);
      setopenTab(data.subscriptions.length - 1);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(loadingFalse());
    }
  };

  const handleDeleteSubscription = async (_id, name) => {
    let confirm = window.confirm(
      `Really want to Delete ${name.toUpperCase()}?`
    );
    if (!confirm) return;
    dispatch(loadingTrue());
    try {
      const { data } = await axios.delete(`/api/v1/software/${_id}`);
      toast.success(data.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
      toast.warn(error.response.data.message, {
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
      getSubscriptions();
      // navigate('/panel/admin/subscriptions');
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    getSubscriptions();
  }, [isAuthenticated, navigate]);

  return (
    <>
      <MetaData title={`OpSoftware - Subscriptions`} />
      <ToastContainer />
      <div className="flex bg-gray-100">
        <UserSidebar activeTab="subscriptions" />
        <div className="pt-24 sm:pt-28 lg:pt-36 px-4 sm:px-12 lg:px-14 w-full overflow-hidden">
          <div className="flex gap-4 flex-col sm:flex-row justify-between sm:items-center mb-4">
            <h3 className="text-xl font-bold w-fit text-black relative after:content-[''] after:absolute after:-bottom-1 after:w-full after:h-[2px] after:bg-black after:left-0">
              All Subscriptions
            </h3>
            <Link
              to="/panel/admin/new-software"
              className="font-semibold w-fit text-blue hover:text-white bg-transparent border-2 border-blue rounded-full px-7 py-2 transition-all duration-300 ease-linear hover:bg-blue flex items-center gap-x-1 focus:outline-none"
            >
              <RiUpload2Fill /> New Software
            </Link>
          </div>
          <div className="overflow-x-auto mb-16">
            {subscriptions?.length !== 0 ? (
              subscriptions.map((product, i) => {
                return (
                  <div key={i}>
                    <div className="rounded-t-lg border border-neutral-200 bg-white">
                      <h2 className="mb-0">
                        <span
                          className="cursor-pointer group relative flex w-full items-center rounded-t-[15px] border-0 bg-white py-4 px-5 text-left text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none text-xl font-semibold"
                          type="button"
                          onClick={() => setopenTab(i)}
                        >
                          <span
                            className={`h-5 mr-6 w-5 shrink-0 ${
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
                          {product.name}
                          <div className="ml-auto flex flex-col sm:flex-row gap-3 items-center">
                            <Link
                              to={`/panel/admin/subscription/${product._id}`}
                              className="w-fit text-blue rounded-full px-4 py-2 transition-all duration-300 ease-linear bg-indigo-100 border-2 border-transparent hover:border-blue flex items-center gap-x-1 focus:outline-none text-base"
                            >
                              <RiEdit2Fill /> Edit
                            </Link>
                            <button
                              className="w-fit text-white hover:bg-indigo-700 rounded-full px-4 py-2 transition-all duration-300 ease-linear bg-blue flex items-center gap-x-1 focus:outline-none text-base"
                              type="button"
                              onClick={() => {
                                handleDeleteSubscription(
                                  product._id,
                                  product.name
                                );
                              }}
                            >
                              <RiDeleteBin2Fill />
                              Del.
                            </button>
                          </div>
                        </span>
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
                              : window.innerWidth < 1024 ||
                                window.innerWidth > 1024
                              ? 'grid-cols-2'
                              : 'grid-cols-3'
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
                                className="bg-indigo-100 rounded-3xl px-6 py-8"
                              >
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
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <span className="pt-6 pb-8 rounded-xl bg-white flex flex-col justify-center items-center">
                  <video
                    src={exclamation_video}
                    autoPlay
                    loop
                    mute="true"
                    className="max-w-[170px] rounded-xl mx-auto"
                  ></video>
                  <p className="mt-3 mb-1 leading-snug text-xl">
                    It Seems like you have not created any subscriptions.
                  </p>
                  <p>
                    Upload new
                    <Link to="/panel/admin/new-software" className="text-blue">
                      {' '}
                      software{' '}
                    </Link>
                    for your clients.
                  </p>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SuscriptionsAdmin;
