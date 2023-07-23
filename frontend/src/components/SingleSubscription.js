import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadingFalse, loadingTrue } from '../store/actions/orderAction';
import axios from 'axios';

function SingleSubscription({ orderId, setorderId }) {
  const dispatch = useDispatch();
  const [order, setorder] = useState(null);

  const getOrder = async () => {
    try {
      dispatch(loadingTrue());
      const { data } = await axios.get(`/api/v1/admin/order/${orderId}`);
      setorder(data.order);
    } catch (error) {
      console.log(error.response.data);
      setorderId(null);
      setorder(null);
    } finally {
      dispatch(loadingFalse());
    }
  };
  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div className="absolute top-0 left-0 w-screen min-h-screen bg-black/50 flex items-center justify-center z-30">
      {order && (
        <div className="max-w-3xl bg-white rounded-lg relative p-10 mt-24 sm:mt-28 lg:mt-36">
          <button
            onClick={() => {
              setorderId(null);
            }}
            className="absolute top-2 right-2"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#000000"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 10l4 4m0 -4l-4 4" />
                <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
              </svg>
            </span>
          </button>

          <div>
            <table>
              <tbody className="text-left">
                <tr>
                  <th className="border-2 border-gray-300 py-3 px-4">
                    Software
                  </th>
                  <td className="border-2 border-gray-300 py-3 px-4">
                    {order.data1.orderItem.name}
                  </td>
                </tr>
                <tr>
                  <th className="border-2 border-gray-300 py-3 px-4">
                    Subscription
                  </th>
                  <td className="border-2 border-gray-300 py-3 px-4">
                    {order.data1.orderItem.item.name}
                  </td>
                </tr>
                <tr>
                  <th className="border-2 border-gray-300 py-3 px-4">
                    Description
                  </th>
                  <td className="border-2 border-gray-300 py-3 px-4">
                    {order.data1.orderItem.item.description}
                  </td>
                </tr>
                <tr>
                  <th className="border-2 border-gray-300 py-3 px-4">Price</th>
                  <td className="border-2 border-gray-300 py-3 px-4">
                    ₹{order.data1.orderItem.item.price} /-
                  </td>
                </tr>
                <tr>
                  <th className="border-2 border-gray-300 py-3 px-4">
                    Product ID
                  </th>
                  <td className="border-2 border-gray-300 py-3 px-4">
                    {order.data1.productKey}
                  </td>
                </tr>
                <tr>
                  <th className="border-2 border-gray-300 py-3 px-4">
                    MAC Address
                  </th>
                  <td className="border-2 border-gray-300 py-3 px-4">
                    {order.data2.MACAddress ? order.data2.MACAddress : '--'}
                  </td>
                </tr>
                <tr>
                  <th className="border-2 border-gray-300 py-3 px-4">
                    Narration
                  </th>
                  <td className="border-2 border-gray-300 py-3 px-4">
                    {order.data2.Narration ? order.data2.Narration : '--'}
                  </td>
                </tr>
                <tr>
                  <th className="border-2 border-gray-300 py-3 px-4">
                    Purchase Date
                  </th>
                  <td className="border-2 border-gray-300 py-3 px-4">
                    {order.data1.createdAt.slice(0, 10)}
                  </td>
                </tr>
                <tr>
                  <th className="border-2 border-gray-300 py-3 px-4">
                    Expiry Date
                  </th>
                  <td className="border-2 border-gray-300 py-3 px-4">
                    {order.data1.expiryDate.slice(0, 10)}
                  </td>
                </tr>
                <tr>
                  <th className="border-2 border-gray-300 py-3 px-4">
                    Payment ID
                  </th>
                  <td className="border-2 border-gray-300 py-3 px-4">
                    {order.data1.paymentInfo.paymentId}
                  </td>
                </tr>
                <tr>
                  <th className="border-2 border-gray-300 py-3 px-4">
                    Razorpay Order ID
                  </th>
                  <td className="border-2 border-gray-300 py-3 px-4">
                    {order.data1.paymentInfo.orderId}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleSubscription;
