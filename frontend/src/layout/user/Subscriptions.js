import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserSidebar from '../../components/UserSidebar';
import { RiDownload2Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadingFalse, loadingTrue } from '../../store/actions/orderAction';
import exclamation_video from '../../video/exclamation-mark.mp4';
import MetaData from '../../components/MetaData';

const Subscriptions = () => {
  const dispatch = useDispatch();

  const [orders, setorders] = useState([]);
  const [downloadProgress, setdownloadProgress] = useState(0);

  const getMyOrders = async () => {
    try {
      dispatch(loadingTrue());
      const { data } = await axios.get('/api/v1/orders/me');
      setorders([...data.orders]);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      dispatch(loadingFalse());
    }
  };

  const downloadSoftware = async (_id) => {
    if (!_id) {
      return;
    }
    dispatch(loadingTrue());

    axios({
      method: 'get',
      url: `/api/v1/software/${_id}`,
      responseType: 'blob',
      onDownloadProgress: (e) => {
        let percent = Math.floor((100 * e.loaded) / e.total);
        setdownloadProgress(percent);
      },
    })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          res.headers.get('content-disposition').split('"')[1]
        );
        document.body.appendChild(link);
        link.click();
        link.remove();
        setdownloadProgress(0);
        dispatch(loadingFalse());
      })
      .catch((error) => {
        console.log(error);
        setdownloadProgress(0);
        dispatch(loadingFalse());
      });
  };
  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <>
      <MetaData title={`OpSoftware - My Subscriptions`} />
      <div className="flex bg-gray-100 relative">
        <UserSidebar activeTab="subscriptions" />
        <div className="pt-24 sm:pt-28 lg:pt-36 px-4 sm:px-12 lg:px-14 w-full overflow-hidden">
          <h3 className="text-black underline underline-offset-[6px] text-xl font-bold mb-4">
            Order History
          </h3>
          <div className="overflow-x-auto">
            {orders?.length !== 0 ? (
              <table className="rounded-md overflow-hidden">
                <thead className="bg-blue">
                  <tr className="text-white">
                    <th className="text-left whitespace-nowrap px-4 py-3 border-l border-white border-l-blue">
                      Sr.
                    </th>

                    <th className="min-w-[170px] pl-4 text-left whitespace-nowrap px-4 py-3 border-l-2 border-white">
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
                    <th className="text-left whitespace-nowrap px-4 py-3 border-l-2 border-white">
                      Product Key
                    </th>
                    <th className="text-left whitespace-nowrap px-4 py-3 border-l-2 border-r border-white">
                      Download
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
                        <td className="py-3 border border-black/10 px-4">
                          {i + 1}
                        </td>

                        <td className="py-3 border border-black/10 px-4">
                          {item.orderItem.name}
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
                          {item.productKey}
                        </td>
                        <td
                          onClick={() => downloadSoftware(item.orderItem._id)}
                          className="rounded duration-300 cursor-pointer h-full hover:bg-slate-300 text-blue  py-3 border border-black/10 px-4"
                        >
                          <RiDownload2Fill size="1.3em" className="mx-auto" />
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
                  It Seems like you have not purchased any subscription.
                </p>
                <p>
                  Check Out the
                  <Link to="/pricing" className="text-blue bg-blend-color-burn">
                    {' '}
                    best software{' '}
                  </Link>
                  for your business
                </p>
              </span>
            )}
          </div>
        </div>
      </div>
      {downloadProgress !== 0 && (
        <div className="select-none flex items-center justify-center h-screen w-screen fixed top-0 left-0 z-50">
          <div className="text-4xl font-bold text-white">
            {downloadProgress}%
          </div>
        </div>
      )}
    </>
  );
};

export default Subscriptions;
