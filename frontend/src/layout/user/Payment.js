import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import logo from '../../images/logo.png';
import price_credit_card from '../../images/price-credit-card.png';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadingFalse,
  loadingTrue,
  newOrder,
  resetOrderState,
} from '../../store/actions/orderAction';
import breadcrumb_shape_2 from '../../images/breadcrumb-shape-2.png';
import home_bg from '../../images/home-bg.jpg';
import MetaData from '../../components/MetaData';

const Payment = ({ razorpayApiKey }) => {
  const dispatch = useDispatch();
  const { newOrderSuccess } = useSelector((state) => state.order);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay(payAmount) {
    dispatch(loadingTrue());
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      toast.warn(
        'Failed to load payment! Please check your internet connection',
        {
          position: 'top-right',
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return;
    }

    // creating a new order
    const result = await axios.post('/api/v1/payment/process', {
      amount: payAmount,
    });

    if (!result) {
      toast.warn('Internal Server Error', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: razorpayApiKey, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: 'OpSoftware',
      description: 'Test Transaction',
      image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        try {
          const result = await axios.post('/api/v1/payment/success', data);
          if (result.data.success === true) {
            let paymentInfo = {
              orderId: result.data.orderId,
              paymentId: result.data.paymentId,
              msg: result.data.msg,
            };
            let orderItem = { _id: cart.item._id };
            dispatch(newOrder(orderItem, paymentInfo));
          }
        } catch (error) {
          toast.info(error.response.data.msg, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      },
      prefill: {
        name: user.name || '',
        email: user.email || '',
      },

      theme: {
        color: '#600ee4',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    dispatch(loadingFalse());
  }

  useEffect(() => {
    if (newOrderSuccess) {
      navigate('panel/subscriptions', { replace: true });
      dispatch(resetOrderState());
    }
    if (!isAuthenticated) {
      navigate('/login');
    }
    if (!cart?.item?._id) {
      navigate('/pricing');
    }
  }, [newOrderSuccess, navigate, dispatch, isAuthenticated, cart]);

  return (
    <>
      <MetaData title={`OpSoftware - Confirm Payment`} />
      <div
        style={{
          backgroundImage: `url(${home_bg})`,
        }}
        className="relative bg-cover bg-no-repeat bg-center sm:pt-16 bg-blue min-h-screen flex justify-center items-center"
      >
        <img
          src={breadcrumb_shape_2}
          alt=""
          className="absolute top-0 right-0 w-full h-56"
        />
        <div className="rounded-3xl container p-6 mx-4 sm:px-8 sm:py-8 md:px-12 sm:mx-auto bg-white">
          {cart &&
            Object.keys(cart?.item).length !== 0 &&
            cart.softwareName && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center justify-center">
                  <div className="container px-6 sm:px-0 mx-auto flex justify-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue text-center md:text-left leading-tight md:leading-tight">
                        Confirm Payment
                      </h2>

                      <p className="font-medium text-lg sm:text-base text-center sm:text-left text-black mt-1 sm:mt-4 md:mt-6">
                        To buy <strong>{cart.softwareName}</strong> for your
                        business
                      </p>
                    </div>
                    <img
                      src={price_credit_card}
                      alt=""
                      className="hidden sm:inline-block md:hidden lg:inline-block w-24 md:w-auto"
                    />
                  </div>
                </div>
                <div className="bg-indigo-100 rounded-3xl px-6 py-8">
                  <p className="font-Urbanist tracking-wide uppercase text-base text-center font-bold">
                    {cart.item.name}
                  </p>
                  <p className="text-center text-black/60 font-semibold leading-snug my-2">
                    {cart.item.description}
                  </p>
                  <p className="font-Urbanist mt-6 text-center text-5xl font-semibold">
                    ₹ {cart.item.price}
                  </p>
                  <p className="text-center text-black/60 font-semibold leading-snug mt-3">
                    {cart.expiryTime}
                  </p>
                  <button
                    className="font-Urbanist text-lg mt-6 mx-auto font-semibold w-fit text-white bg-blue rounded-lg px-8 py-3 transition-all duration-300 ease-linear hover:bg-indigo-600 hover:scale-105 flex items-center gap-x-1 focus:outline-none"
                    type="button"
                    onClick={() => displayRazorpay(cart.item.price)}
                  >
                    Pay ₹ {cart.item.price}
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default Payment;
