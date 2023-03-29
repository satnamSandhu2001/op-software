import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import price_credit_card from '../../images/price-credit-card.png';
import { addToCart } from '../../store/actions/orderAction';
import { getSoftwares } from '../../store/actions/softwareActions';
import MetaData from '../../components/MetaData';

const Pricing = () => {
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

  useEffect(() => {
    if (softwares) {
      setopenTab(softwares.length - 1);
    }
  }, [softwares]);

  return (
    <>
      <MetaData title={`OpSoftware - Pricing`} />
      <div>
        <div className="pt-32 pb-48 bg-blue">
          <div className="container px-6 sm:px-0 mx-auto flex justify-center sm:justify-between">
            <div>
              <h2 className="text-5xl sm:text-7xl font-bold text-white text-center sm:text-left">
                Pricing plans
              </h2>
              <p className="font-medium text-lg sm:text-base text-center sm:text-left text-white mt-6">
                Clear, affordable plans for every business and requirement
              </p>
            </div>
            <img
              src={price_credit_card}
              alt="Software Pricing"
              className="hidden sm:inline-block"
            />
          </div>
        </div>
        <div className="-mt-32 rounded-3xl container p-6 mx-4 sm:px-8 sm:py-8 sm:mx-auto bg-white">
          {softwares && softwares?.length !== 0 ? (
            softwares?.map((product, i) => {
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
            })
          ) : (
            <>
              <p className="text-center text-xl font-semibold">
                No Software is Available
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Pricing;
