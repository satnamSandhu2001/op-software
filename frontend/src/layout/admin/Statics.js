import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaRegChartBar, FaUsers } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import UserSidebar from '../../components/UserSidebar';
import { loadingFalse, loadingTrue } from '../../store/actions/orderAction';
import { AiOutlineAppstoreAdd, AiOutlineShoppingCart } from 'react-icons/ai';
import MetaData from '../../components/MetaData';

const Statics = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [wish, setwish] = useState('');
  const [stats, setstats] = useState({});
  const [month, setmonth] = useState(1);

  function handleWish() {
    let time = new Date().getHours();
    if (time < 12) {
      setwish('Good morning');
    } else if (time >= 12 && time < 15) {
      setwish('Good afternoon');
    } else if (time >= 15 && time < 18) {
      setwish('Good evening');
    } else {
      setwish('Good night');
    }
  }
  const getStats = async (changeMonth) => {
    try {
      dispatch(loadingTrue());
      const config = { Headers: { 'Content-Type': 'application/json' } };
      let date = new Date();
      if (changeMonth) {
        date.setMonth(date.getMonth() - changeMonth);
      } else {
        date.setMonth(date.getMonth() - month);
      }
      const { data } = await axios.post('/api/v1/stats', { date }, config);
      setstats(data.stats);
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
  const handleMonthChange = (e) => {
    e.target.value = e.target.value.slice(0, 2);
    setmonth(e.target.value);
    getStats(e.target.value);
  };

  useEffect(() => {
    if (!isAuthenticated) navigate('/login?redirect=statics');
    handleWish();
    getStats();
  }, [isAuthenticated, navigate]);

  return (
    <>
      <MetaData title={`OpSoftware - Statics`} />
      <ToastContainer />
      <div className="flex bg-gray-100">
        <UserSidebar activeTab="statics" />
        {Object.keys(user).length !== 0 && (
          <div className="pt-24 sm:pt-28 lg:pt-36 px-4 sm:px-12 lg:px-14 w-full overflow-hidden">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold w-fit text-black mb-4">
              {wish}, {user.name}!
            </h3>
            {Object.keys(stats).length !== 0 && (
              <div className="mb-16 mt-8 flex flex-wrap items-start gap-8">
                <div className="rounded-2xl shadow-soft-xl p-8 bg-white">
                  <FaRegChartBar
                    className="text-blue mb-2"
                    size="2em"
                    stroke="none"
                  />
                  <span className="text-2xl font-semibold text-blue mb-2 inline-block">
                    Total Orders
                  </span>

                  <p className="font-bold text-black/70 mt-1">
                    Total :{' '}
                    {stats.orders?.totalOrders.length !== 0
                      ? stats.orders.totalOrders[0].length
                      : 0}
                  </p>
                  <p className="font-bold text-black/70 mt-1">
                    Earnings : ₹
                    {stats.orders.totalOrders.length !== 0
                      ? stats.orders.totalOrders[0].payment
                      : 0}
                  </p>
                </div>
                <div className="rounded-2xl shadow-soft-xl p-8 bg-white">
                  <AiOutlineShoppingCart
                    className="text-blue mb-2"
                    size="2em"
                  />
                  <span className="text-2xl font-semibold text-blue mb-2 inline-block">
                    Last{' '}
                    <select
                      className="text-[0.8em] bg-green-100 w-min rounded pl-1 mx-2 cursor-pointer"
                      value={month}
                      onChange={handleMonthChange}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>{' '}
                    Month Orders
                  </span>

                  <p className="font-bold text-black/70 mt-1">
                    Total :{' '}
                    {stats.orders.totalOrders.length !== 0
                      ? stats.orders.totalOrders[0].length
                      : 0}
                  </p>
                  <p className="font-bold text-black/70 mt-1">
                    Earnings : ₹
                    {stats.orders.totalOrders.length !== 0
                      ? stats.orders.totalOrders[0].payment
                      : 0}
                  </p>
                </div>
                <div className="rounded-2xl shadow-soft-xl p-8 bg-white">
                  <FaUsers
                    className="text-blue mb-2"
                    size="2em"
                    stroke="none"
                  />
                  <span className="text-2xl font-semibold text-blue mb-2 inline-block">
                    Total Users :{' '}
                    {stats.users?.length === 1
                      ? stats.users[0].total
                      : stats.users?.length > 1
                      ? stats.users[0].total + stats.users[1].total
                      : 0}
                  </span>
                  <p className="mt-1 font-bold text-black/70 capitalize">
                    {stats.users?.length !== 0 &&
                      stats.users[0].role + ' : ' + stats.users[0].total}
                  </p>
                  <p className="mt-1 font-bold text-black/70 capitalize">
                    {stats.users?.length > 1 &&
                      stats.users[1].role + ' : ' + stats.users[1].total}
                  </p>
                </div>
                {stats.software?.earning.length !== 0 && (
                  <div className="rounded-2xl shadow-soft-xl p-8 bg-white">
                    <AiOutlineAppstoreAdd
                      className="text-blue mb-2"
                      size="2em"
                      stroke="none"
                    />
                    <span className="text-2xl font-semibold text-blue mb-2 inline-block">
                      Earnings Software Wise
                    </span>

                    <div className="flex flex-wrap gap-6">
                      {stats.software?.earning &&
                        stats.software?.earning?.map((item, i) => {
                          return (
                            <Link
                              to={`/panel/admin/subscription/${item.software_id}`}
                              key={i}
                              className="bg-indigo-50 shadow-soft-sm p-2 rounded-md font-bold text-black/70 cursor-pointer"
                            >
                              <p className="mt-1">Name : {item.name}</p>
                              <p className="mt-1">Profit : ₹{item.profit}</p>
                              <p className="mt-1">Quantity : {item.length}</p>
                            </Link>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Statics;
