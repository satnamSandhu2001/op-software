import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import UserSidebar from '../../components/UserSidebar';
import { loadingFalse, loadingTrue } from '../../store/actions/orderAction';
import exclamation_video from '../../video/exclamation-mark.mp4';
import MetaData from '../../components/MetaData';

const SingleUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [user, setuser] = useState({});
  const [orders, setorders] = useState([]);

  const getUserData = async () => {
    try {
      dispatch(loadingTrue());
      const { data } = await axios.get(`/api/v1/user/${id}`);
      setuser(data.user);
    } catch (error) {
      toast.error('User Account Not found or has been Deleted', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate('/panel/users');
      }, 5000);
    } finally {
      dispatch(loadingFalse());
    }
  };

  const getUserOrders = async () => {
    try {
      dispatch(loadingTrue());
      const { data } = await axios.get(`/api/v1/admin/user-orders/${id}`);
      setorders(data.orders);
    } catch (error) {
      console.log(error.response.data.message);
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
      getUserOrders();
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

  useEffect(() => {
    getUserData();
    getUserOrders();
    if (!isAuthenticated) navigate('/login?redirect=users');
  }, [navigate, isAuthenticated]);

  return (
    <>
      {' '}
      <MetaData
        title={`OpSoftware - Edit User ${user?.name ? user.name : ''}`}
      />
      <ToastContainer />
      <div className="flex bg-gray-100">
        <UserSidebar activeTab="users" />
        {Object.keys(user).length !== 0 && (
          <div className="pt-24 sm:pt-28 lg:pt-36 px-4 sm:px-12 lg:px-14 w-full overflow-hidden">
            <div className="bg-white rounded-t-md shadow-soft-sm p-4 sm:px-8 sm:py-6">
              <h3 className="text-2xl sm:text-3xl w-fit text-black relative after:content-[''] after:absolute after:-bottom-1 after:w-full after:h-[2px] after:bg-black after:left-0">
                User Data
              </h3>
              <div className="py-6 max-w-2xl border-b-2 border-gray-300 overflow-x-auto">
                {/* name */}
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-y-2 gap-x-6 mb-4 items-center">
                  <span className="font-semibold whitespace-nowrap">
                    Name :{' '}
                  </span>
                  <input
                    className="border px-4 sm:px-6 py-2 rounded-md"
                    value={user.name}
                    disabled
                  />
                </div>

                {/* email */}
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-y-2 gap-x-6 mb-4 items-center">
                  <span className="font-semibold whitespace-nowrap">
                    Email :{' '}
                  </span>
                  <input
                    className="border px-4 sm:px-6 py-2 rounded-md"
                    value={user.email}
                    disabled
                  />
                </div>
                {/* createdAt */}
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-y-2 gap-x-6 mb-4 items-center">
                  <span className="font-semibold whitespace-nowrap">
                    Account Created:{' '}
                  </span>
                  <input
                    className="border px-4 sm:px-6 py-2 rounded-md"
                    value={user.createdAt.slice(0, 10)}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto mb-16 p-4 bg-white">
              {orders?.length !== 0 ? (
                <table className="rounded-md overflow-hidden">
                  <thead className="bg-blue">
                    <tr className="text-white">
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
                    <b>{user.name}</b> has not purchased any subscription.
                  </p>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleUser;
