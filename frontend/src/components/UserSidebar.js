import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaCartArrowDown, FaChartLine, FaUser, FaUsers } from 'react-icons/fa';
import { BsBagCheckFill } from 'react-icons/bs';

const UserSidebar = ({ activeTab }) => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div className="h-screen shadow-lg inline-block w-fit md:w-72 sticky top-0 select-none">
        <div className="h-full bg-white">
          <nav className="pt-28 lg:pt-32">
            <div className="mx-1 md:mx-0">
              <Link
                to="/panel/account"
                className={`flex items-center justify-center md:justify-start w-[90%] mx-auto rounded-lg overflow-hidden p-1 pl-2 my-2 transition-colors duration-200 border-l-4 hover:text-blue hover:bg-slate-50 hover:shadow-soft-xl ${
                  activeTab === 'account'
                    ? 'border-blue bg-slate-50 text-blue shadow-soft-xl'
                    : 'border-white text-[#000229]'
                }`}
              >
                <span
                  className={`text-left px-1 py-2 md:p-2 mr-1 ${
                    activeTab !== 'account' &&
                    'shadow-soft-xl bg-slate-100 rounded-lg'
                  }`}
                >
                  <FaUser />
                </span>
                <span className="mx-2 text-lg font-normal hidden md:inline-block">
                  Account
                </span>
              </Link>
              {user?.role === 'user' && (
                <Link
                  to="/panel/subscriptions"
                  className={`flex items-center justify-center md:justify-start w-[90%] mx-auto rounded-lg overflow-hidden p-1 pl-2 my-2 transition-colors duration-200 border-l-4 hover:text-blue hover:bg-slate-50 hover:shadow-soft-xl ${
                    activeTab === 'subscriptions'
                      ? 'border-blue bg-slate-50 text-blue shadow-soft-xl'
                      : 'border-white text-[#000229]'
                  }`}
                >
                  <span
                    className={`text-left px-1 py-2 md:p-2 mr-1 ${
                      activeTab !== 'subscriptions' &&
                      'shadow-soft-xl bg-slate-100 rounded-lg'
                    }`}
                  >
                    <BsBagCheckFill />{' '}
                  </span>
                  <span className="mx-2 text-lg font-normal hidden md:inline-block">
                    Subscriptions
                  </span>
                </Link>
              )}
              {user?.role === 'admin' && (
                <>
                  <Link
                    to="/panel/statics"
                    className={`flex items-center justify-center md:justify-start w-[90%] mx-auto rounded-lg overflow-hidden p-1 pl-2 my-2 transition-colors duration-200 border-l-4 hover:text-blue hover:bg-slate-50 hover:shadow-soft-xl ${
                      activeTab === 'statics'
                        ? 'border-blue bg-slate-50 text-blue shadow-soft-xl'
                        : 'border-white text-[#000229]'
                    }`}
                  >
                    <span
                      className={`text-left px-1 py-2 md:p-2 mr-1 ${
                        activeTab !== 'statics' &&
                        'shadow-soft-xl bg-slate-100 rounded-lg'
                      }`}
                    >
                      <FaChartLine />
                    </span>
                    <span className="mx-2 text-lg font-normal hidden md:inline-block">
                      Statics
                    </span>
                  </Link>
                  <Link
                    to="/panel/admin/subscriptions"
                    className={`flex items-center justify-center md:justify-start w-[90%] mx-auto rounded-lg overflow-hidden p-1 pl-2 my-2 transition-colors duration-200 border-l-4 hover:text-blue hover:bg-slate-50 hover:shadow-soft-xl ${
                      activeTab === 'subscriptions'
                        ? 'border-blue bg-slate-50 text-blue shadow-soft-xl'
                        : 'border-white text-[#000229]'
                    }`}
                  >
                    <span
                      className={`text-left px-1 py-2 md:p-2 mr-1 ${
                        activeTab !== 'subscriptions' &&
                        'shadow-soft-xl bg-slate-100 rounded-lg'
                      }`}
                    >
                      <BsBagCheckFill />
                    </span>
                    <span className="mx-2 text-lg font-normal hidden md:inline-block">
                      Subscriptions
                    </span>
                  </Link>
                  <Link
                    to="/panel/orders"
                    className={`flex items-center justify-center md:justify-start w-[90%] mx-auto rounded-lg overflow-hidden p-1 pl-2 my-2 transition-colors duration-200 border-l-4 hover:text-blue hover:bg-slate-50 hover:shadow-soft-xl ${
                      activeTab === 'orders'
                        ? 'border-blue bg-slate-50 text-blue shadow-soft-xl'
                        : 'border-white text-[#000229]'
                    }`}
                  >
                    <span
                      className={`text-left px-1 py-2 md:p-2 mr-1 ${
                        activeTab !== 'orders' &&
                        'shadow-soft-xl bg-slate-100 rounded-lg'
                      }`}
                    >
                      <FaCartArrowDown />
                    </span>
                    <span className="mx-2 text-lg font-normal hidden md:inline-block">
                      Orders
                    </span>
                  </Link>
                  <Link
                    to="/panel/users"
                    className={`flex items-center justify-center md:justify-start w-[90%] mx-auto rounded-lg overflow-hidden p-1 pl-2 my-2 transition-colors duration-200 border-l-4 hover:text-blue hover:bg-slate-50 hover:shadow-soft-xl ${
                      activeTab === 'users'
                        ? 'border-blue bg-slate-50 text-blue shadow-soft-xl'
                        : 'border-white text-[#000229]'
                    }`}
                  >
                    <span
                      className={`text-left px-1 py-2 md:p-2 mr-1 ${
                        activeTab !== 'users' &&
                        'shadow-soft-xl bg-slate-100 rounded-lg'
                      }`}
                    >
                      <FaUsers />
                    </span>
                    <span className="mx-2 text-lg font-normal hidden md:inline-block">
                      Users
                    </span>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default UserSidebar;
