import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserSidebar from '../../components/UserSidebar';
import { FiExternalLink } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadingFalse, loadingTrue } from '../../store/actions/orderAction';
import exclamation_video from '../../video/exclamation-mark.mp4';
import { AiFillDelete } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import MetaData from '../../components/MetaData';
import SingleSubscription from '../../components/SingleSubscription';
import { SlMagnifier } from 'react-icons/sl';

const Subscriptions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [orders, setorders] = useState([]);
  const [oldOrders, setoldOrders] = useState([]);
  // orderId used to show single order with details
  const [orderId, setorderId] = useState(null);
  const [filterQuery, setfilterQuery] = useState('');

  const getOrders = async () => {
    try {
      dispatch(loadingTrue());
      const { data } = await axios.get('/api/v1/admin/orders', {
        params: { query: filterQuery },
      });
      setorders([...data.orders]);
    } catch (error) {
      console.log(error.response.data);
      setoldOrders([]);
    } finally {
      dispatch(loadingFalse());
    }
  };
  const deleteOrder = async (_id) => {
    if (!_id) return;
    let confirm = window.confirm('Delete Order');
    if (!confirm) return;
    try {
      dispatch(loadingTrue());
      await axios.delete(`/api/v1/admin/order/${_id}`);
      getOrders();
    } catch (error) {
      console.log(error);
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

  function handleFilterQuerySubmit(e) {
    e.preventDefault();
    getOrders();
  }
  function handleClearFilters() {
    setfilterQuery('');
    setTimeout(() => {
      getOrders();
    }, 1000);
  }

  useEffect(() => {
    getOrders();
    if (!isAuthenticated) navigate('/login?redirect=orders');
  }, [isAuthenticated, navigate]);

  return (
    <>
      <MetaData title={`OpSoftware - Orders `} />
      <ToastContainer />
      <div className="flex bg-gray-100 relative">
        <UserSidebar activeTab="orders" />
        <div className="pt-24 sm:pt-28 lg:pt-36 px-4 sm:px-12 lg:px-14 w-full overflow-hidden">
          <h3 className="text-xl font-bold w-fit text-black relative after:content-[''] after:absolute after:-bottom-1 after:w-full after:h-[2px] after:bg-black after:left-0 mb-4">
            All Orders History
          </h3>

          {/* filters */}
          <div className="flex justify-between items-stretch gap-4 mt-6 mb-4">
            <form onSubmit={handleFilterQuerySubmit} className=" w-full">
              <div className="px-3 flex items-stretch justify-between border border-gray-400 rounded-md overflow-hidden">
                <input
                  type="text"
                  value={filterQuery}
                  onChange={(e) => {
                    setfilterQuery(e.target.value);
                  }}
                  required
                  className="py-2 w-full outline-none border-none"
                  placeholder="Search for Product Key, Software, Validity, Price, Payment ID..."
                />
                <button type="submit" className="cursor-pointer pl-4">
                  <SlMagnifier />
                </button>
              </div>
            </form>
            <button
              type="button"
              onClick={() => {
                handleClearFilters();
              }}
              className="bg-gray-300 hover:bg-gray-400 duration-300 rounded-md whitespace-nowrap py-1 px-4"
            >
              Clear <span className="hidden sm:inline-block">Filters</span>
            </button>
          </div>

          <div className="overflow-x-auto mb-16">
            {orders?.length !== 0 ? (
              <table className="rounded-md overflow-hidden">
                <thead className="bg-blue">
                  <tr className="text-white">
                    <th className="text-left whitespace-nowrap px-4 pl-4 py-3 border-l border-white border-l-blue">
                      Sr.
                    </th>
                    <th className="text-left whitespace-nowrap px-4 pl-4 py-3 border-l-2 border-white">
                      User
                    </th>
                    <th className="min-w-[170px] text-left whitespace-nowrap px-4 pl-4 py-3 border-l border-white border-l-blue">
                      Software
                    </th>
                    <th className="text-left whitespace-nowrap px-4 py-3 border-l-2 border-white">
                      Subscription
                    </th>
                    <th className="text-left whitespace-nowrap px-4 py-3 border-l-2 border-white">
                      Validity
                    </th>
                    <th className="text-left whitespace-nowrap px-4 py-3 border-l-2 border-white">
                      Status
                    </th>
                    <th className="text-left whitespace-nowrap px-4 py-3 border-l-2 border-white">
                      Purchase Date
                    </th>
                    <th className="text-left whitespace-nowrap px-4 border-l-2 border-white">
                      Expiry Date
                    </th>
                    <th className="text-left whitespace-nowrap px-4 py-3 border-l-2 border-white">
                      Price
                    </th>
                    <th className="text-left whitespace-nowrap px-4 py-3 border-l-2 border-r border-white">
                      Razorpay Payment ID
                    </th>
                    <th className="text-left whitespace-nowrap px-4 py-3 border-l-2 border-r border-white">
                      Razorpay Order Id
                    </th>
                    <th className="text-left whitespace-nowrap px-4 py-3 border-l-2 border-r border-white">
                      Product Key
                    </th>
                    <th className="text-left whitespace-nowrap px-4 py-3 border-l-2 border-r border-white">
                      Del.
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((item, i) => {
                    let expMs = item.orderItem.item.expiryTime;
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
                      <tr key={i} className="even:bg-indigo-100">
                        <td
                          onClick={() => {
                            setorderId(item._id);
                          }}
                          className="text-center cursor-pointer py-3 border border-black/10 px-4 text-blue hover:bg-slate-300 duration-300"
                        >
                          {i + 1}
                        </td>
                        <td className="py-3 border border-black/10 px-4 text-blue hover:bg-slate-300 duration-300">
                          <Link to={`/panel/user/${item.user}`}>
                            <FiExternalLink className="mx-auto" size="1.3em" />
                          </Link>
                        </td>
                        <td className="py-3 border border-black/10 px-4 text-blue hover:bg-slate-300 duration-300">
                          <Link
                            to={`/panel/admin/subscription/${item.orderItem._id}`}
                          >
                            {item.orderItem.name}
                          </Link>
                        </td>
                        <td className="py-3 border border-black/10 px-4">
                          {item.orderItem.item.name}
                        </td>
                        <td className="py-3 border border-black/10 px-4 whitespace-nowrap">
                          {year !== 0 && year + ' Year'}{' '}
                          {month !== 0 && month + ' Month'}
                        </td>
                        <td
                          className={`py-3 border border-black/10 px-4 whitespace-nowrap ${
                            item.orderItem.item.expiryTime < Date.now()
                              ? 'text-green-600'
                              : 'text-red-500'
                          }`}
                        >
                          {item.orderItem.item.expiryTime < Date.now()
                            ? 'Active'
                            : 'expired'}
                        </td>
                        <td className="whitespace-nowrap py-3 border border-black/10 px-4 ">
                          {item.createdAt.slice(0, 10)}
                        </td>
                        <td className="whitespace-nowrap py-3 border border-black/10 px-4 ">
                          {item.expiryDate.slice(0, 10)}
                        </td>
                        <td className="whitespace-nowrap py-3 border border-black/10 px-4 ">
                          ₹ {item.orderItem.item.price}
                        </td>
                        <td className="whitespace-nowrap py-3 border border-black/10 px-4 ">
                          {item.paymentInfo.paymentId}
                        </td>
                        <td className="whitespace-nowrap py-3 border border-black/10 px-4 ">
                          {item.paymentInfo.orderId}
                        </td>
                        <td className="whitespace-nowrap py-3 border border-black/10 px-4 ">
                          {item.productKey}
                        </td>
                        <td
                          onClick={() => deleteOrder(item._id)}
                          className="rounded duration-300 cursor-pointer h-full hover:bg-slate-300 text-blue  py-3 border border-black/10 px-4"
                        >
                          <AiFillDelete size="1.3em" className="mx-auto" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <span className="pt-6 pb-8 rounded-xl bg-white flex flex-col justify-center items-center">
                <video
                  src={exclamation_video}
                  autoPlay
                  loop
                  mute="true"
                  className="max-w-[170px] rounded-xl mx-auto"
                ></video>
                <p className="mt-3 mb-1 leading-snug text-xl">
                  It Seems like nobody have not purchased any subscription.
                </p>
              </span>
            )}
          </div>
        </div>

        {orderId && (
          <SingleSubscription orderId={orderId} setorderId={setorderId} />
        )}
      </div>
    </>
  );
};

export default Subscriptions;
