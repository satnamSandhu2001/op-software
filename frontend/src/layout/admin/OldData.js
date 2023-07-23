import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserSidebar from '../../components/UserSidebar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadingFalse, loadingTrue } from '../../store/actions/orderAction';
import exclamation_video from '../../video/exclamation-mark.mp4';
import MetaData from '../../components/MetaData';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import { SlMagnifier } from 'react-icons/sl';

const OldData = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [orders, setorders] = useState([]);
  const [pageNo, setpageNo] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [filterQuery, setfilterQuery] = useState('');

  const getOrders = async () => {
    try {
      dispatch(loadingTrue());
      const { data } = await axios.get('/api/v1/admin/orders/old', {
        params: {
          pageNo,
          query: filterQuery,
        },
      });
      setorders(data.results);
      settotalPages(data.totalPages);
    } catch (error) {
      console.log(error.response.data);
      setorders([]);
    } finally {
      dispatch(loadingFalse());
    }
  };

  const paginate = ({ selected }) => {
    setpageNo(selected + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    if (!isAuthenticated) navigate('/login?redirect=orders/old');
  }, [isAuthenticated, navigate, pageNo]);

  return (
    <>
      <MetaData title={`OpSoftware - Old Data`} />
      <div className="flex bg-gray-100 relative">
        <UserSidebar activeTab="old_orders" />
        <div className="pt-24 sm:pt-28 lg:pt-36 px-4 sm:px-12 lg:px-14 w-full overflow-hidden">
          <h3 className="text-xl font-bold w-fit text-black relative after:content-[''] after:absolute after:-bottom-1 after:w-full after:h-[2px] after:bg-black after:left-0 mb-4">
            Old Data
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
                  placeholder="Search for Id, Narration, MAC Address, Reg. Date,  Exp. Date..."
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

          <div className={`overflow-x-auto mb-16`}>
            {orders?.length !== 0 ? (
              <>
                <table className="rounded-md overflow-hidden">
                  <thead className="bg-blue">
                    <tr className="text-white">
                      <th className="text-left whitespace-nowrap px-4 pl-4 py-3 border-l border-white border-l-blue">
                        ID
                      </th>
                      <th className="text-left whitespace-nowrap px-4 pl-4 py-3 border-l-2 border-white">
                        Narration
                      </th>
                      <th className="min-w-[170px] text-left whitespace-nowrap px-4 pl-4 py-3 border-l border-white border-l-blue">
                        MAC Address
                      </th>
                      <th className="text-left whitespace-nowrap px-4 py-3 border-l-2 border-white">
                        Reg. Date
                      </th>

                      <th className="text-left whitespace-nowrap px-4 py-3 border-l-2 border-r border-white">
                        Exp. Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item, i) => {
                      return (
                        <tr key={i} className="even:bg-indigo-100">
                          <td className="py-3 border border-black/10 px-4">
                            {item.OpUserId}
                          </td>
                          <td className="whitespace-pre-wrap py-3 border border-black/10 px-4 ">
                            {item.Narration ? item.Narration : '-'}
                          </td>
                          <td className="whitespace-nowrap py-3 border border-black/10 px-4 ">
                            {item.MACAddress}
                          </td>
                          <td className="whitespace-nowrap py-3 border border-black/10 px-4 ">
                            {item.RegisterDate.slice(0, 10)}
                          </td>
                          <td className="whitespace-nowrap h-full py-3 border border-black/10 px-4">
                            {item.ExpiryDate.slice(0, 10)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {totalPages !== 0 && (
                  <div className="mt-8 mb-4">
                    <ReactPaginate
                      onPageChange={paginate}
                      pageCount={totalPages}
                      containerClassName={
                        'flex justify-start items-stretch gap-4 w-fit p-2 rounded-md shadow-[0_3px_15px_-3px_rgb(0,0,0,0.1)]'
                      }
                      previousLabel={
                        <>
                          <MdKeyboardArrowLeft />
                        </>
                      }
                      nextLabel={
                        <>
                          <MdKeyboardArrowRight />
                        </>
                      }
                      previousLinkClassName={
                        'flex gap-2 items-center justify-center rounded-md w-10 aspect-square border border-gray-300 h-full hover:shadow-lg duration-300 hover:scale-105'
                      }
                      nextLinkClassName={
                        'flex items-center justify-center rounded-md w-10 aspect-square border border-gray-300 h-full hover:shadow-lg duration-300 hover:scale-105'
                      }
                      pageLinkClassName={
                        'flex items-center justify-center rounded-md w-10 aspect-square border border-gray-300 h-full hover:shadow-lg duration-300 hover:scale-105'
                      }
                      activeLinkClassName={'bg-blue text-white'}
                    />
                  </div>
                )}
              </>
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
                  No Data Available
                </p>
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OldData;
