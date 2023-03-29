import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import UserSidebar from '../../components/UserSidebar';
import { loadingFalse, loadingTrue } from '../../store/actions/orderAction';
import { MdLibraryAdd } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import MetaData from '../../components/MetaData';

const EditSubscription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [subscription, setsubscription] = useState({});
  const [editDataSubscription, seteditDataSubscription] = useState([]);
  const [originalDataLength, setoriginalDataLength] = useState(0);
  const [softwareFile, setsoftwareFile] = useState(null);

  const getSubscription = async () => {
    dispatch(loadingTrue());
    try {
      const { data } = await axios.get(`/api/v1/subscription/${id}`);

      for (let i = 0; i < data.subscription.item.length; i++) {
        data.subscription.item[i].expiryMonth =
          data.subscription.item[i].expiryTime / 2629800000;
        delete data.subscription.item[i].expiryTime;
      }

      setoriginalDataLength(data.subscription.item.length);
      setsubscription(data.subscription);
      seteditDataSubscription([...data.subscription.item]);
    } catch (error) {
      toast.warn(error.response.data.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate(-1);
      }, 2500);
    } finally {
      dispatch(loadingFalse());
    }
  };

  const handleSoftwareUpdate = async (e) => {
    e.preventDefault();
    dispatch(loadingTrue());
    if (!softwareFile) return;
    try {
      const formData = new FormData();
      formData.append('software', softwareFile);

      const { data } = await axios.put(`/api/v1/software/${id}`, formData);
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
      setsoftwareFile(null);
    }
  };

  const handleEditDataSubscriptionInput = (e, _id, type) => {
    seteditDataSubscription((current) =>
      current.map((obj) => {
        if (obj._id === _id) {
          return { ...obj, [type]: e.target.value };
        }
        return obj;
      })
    );
  };

  const handleDataSubmit = async (e) => {
    e.preventDefault();
    dispatch(loadingTrue());
    if (!editDataSubscription || !subscription.name) {
      return dispatch(loadingFalse());
    }
    if (editDataSubscription.length === 0) {
      dispatch(loadingFalse());
      return toast.warn('Please add atleast 1 subscription', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    for (let i = 0; i < editDataSubscription.length; i++) {
      editDataSubscription[i].expiryTime =
        editDataSubscription[i].expiryMonth * 2629800000;
      if (i + 1 > originalDataLength) {
        delete editDataSubscription[i]._id;
      }
    }
    try {
      const formData = { item: editDataSubscription, name: subscription.name };
      const { data } = await axios.put(`/api/v1/subscription/${id}`, formData);

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
      getSubscription();
      dispatch(loadingFalse());
    }
  };

  function randomString(string_length) {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyz';
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars[rnum];
    }
    return randomstring;
  }

  const addRow = () => {
    seteditDataSubscription((current) => [
      ...current,
      {
        description: '',
        expiryMonth: 1,
        name: '',
        price: 0,
        _id: randomString(24).toLocaleLowerCase(),
      },
    ]);
  };
  const deleteRow = (_id, name) => {
    let prompt = window.confirm(`Remove "SUBSCRIPTION ${name}" ?`);
    if (!prompt) return;
    seteditDataSubscription(
      editDataSubscription.filter((item) => item._id !== _id)
    );
  };

  useEffect(() => {
    getSubscription();
    if (!isAuthenticated) navigate(`/login?redirect=admin/subscription/${id}`);
  }, [isAuthenticated, navigate]);

  return (
    <>
      <MetaData
        title={`OpSoftware - Edit Software ${
          subscription ? subscription.name : ''
        }`}
      />
      <ToastContainer />
      <div className="flex bg-gray-100">
        <UserSidebar activeTab="subscriptions" />
        <div className="pt-24 sm:pt-28 lg:pt-36 px-4 sm:px-12 lg:pl-14 lg:pr-20 w-full overflow-hidden">
          {Object.keys(subscription).length !== 0 && (
            <div className="w-full mb-8 flex flex-col-reverse gap-6 lg:flex-row">
              <form
                className="w-full shadow-soft-sm bg-white h-max py-4 px-2 sm:py-4 sm:px-5"
                onSubmit={handleDataSubmit}
              >
                {/* software name */}
                <h3 className="text-black text-xl font-bold mb-6">
                  Edit Subscription & Software
                </h3>
                {subscription.name && (
                  <div className="mb-4 relative border border-slate-300 px-2 py-4 sm:py-4 sm:px-5 bg-white rounded-md">
                    <span className="absolute -top-2.5 left-5 bg-slate-200 border rounded-md px-3 text-blue  text-sm">
                      Software Name
                    </span>
                    <input
                      className="w-full focus:outline-none"
                      type="text"
                      placeholder="Software Name"
                      required
                      value={subscription.name}
                      onChange={(e) => {
                        setsubscription({
                          ...subscription,
                          name: e.target.value,
                        });
                      }}
                    />
                  </div>
                )}
                {editDataSubscription?.length !== 0 &&
                  editDataSubscription?.map((product, i) => {
                    return (
                      <div
                        key={i}
                        className="bg-white shadow-[0px_2px_3px_-3px_#000000cc] py-4 mb-4 rounded"
                      >
                        <div className="mb-4 flex justify-between items-center">
                          <p className="font-bold text-black">
                            Subscription {i + 1}
                          </p>
                          <button
                            className="w-fit bg-blue text-white p-0.5 rounded cursor-pointer hover:bg-indigo-700 duration-300"
                            type="button"
                            onClick={() => deleteRow(product._id, i + 1)}
                          >
                            <RxCross2 size="1.5em" />
                          </button>
                        </div>
                        <div className="mb-4 relative border border-slate-300 px-2 py-4 sm:py-4 sm:px-5 bg-white rounded-md">
                          <span className="absolute -top-2.5 left-5 bg-slate-200 border rounded-md px-3 text-blue  text-sm">
                            Name
                          </span>
                          <input
                            className="w-full focus:outline-none"
                            type="text"
                            placeholder="Subscription Name"
                            required
                            value={editDataSubscription[i].name}
                            onChange={(e) => {
                              handleEditDataSubscriptionInput(
                                e,
                                product._id,
                                'name'
                              );
                            }}
                          />
                        </div>
                        <div className="mb-4 relative border border-slate-300 px-2 py-4 sm:py-4 sm:px-5 bg-white rounded-md">
                          <span className="absolute -top-2.5 left-5 bg-slate-200 border rounded-md px-3 text-blue  text-sm">
                            Description
                          </span>
                          <input
                            className="w-full focus:outline-none"
                            type="text"
                            placeholder="Subscription Description"
                            required
                            value={editDataSubscription[i].description}
                            onChange={(e) => {
                              handleEditDataSubscriptionInput(
                                e,
                                product._id,
                                'description'
                              );
                            }}
                          />
                        </div>
                        <div className="mb-4 relative border border-slate-300 px-2 py-4 sm:py-4 sm:px-5 bg-white rounded-md">
                          <span className="absolute -top-2.5 left-5 bg-slate-200 border rounded-md px-3 text-blue  text-sm">
                            price
                          </span>
                          <input
                            className="w-full focus:outline-none"
                            type="number"
                            placeholder="Subscription Price"
                            required
                            value={editDataSubscription[i].price}
                            onChange={(e) => {
                              handleEditDataSubscriptionInput(
                                e,
                                product._id,
                                'price'
                              );
                            }}
                          />
                        </div>

                        <div className="mb-4 relative border border-slate-300 px-2 py-4 sm:py-4 sm:px-5 bg-white rounded-md">
                          <span className="absolute -top-2.5 left-5 bg-slate-200 border rounded-md px-3 text-blue  text-sm">
                            Expiry Time in Months
                          </span>
                          <input
                            className="w-full focus:outline-none"
                            type="number"
                            placeholder="Duration in Months"
                            required
                            minLength="0"
                            value={product.expiryMonth}
                            onChange={(e) => {
                              handleEditDataSubscriptionInput(
                                e,
                                product._id,
                                'expiryMonth'
                              );
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                <button
                  className="flex justify-center items-center gap-x-4 w-full mb-4 text-black py-2 px-8 rounded cursor-pointer bg-indigo-200 hover:bg-indigo-300/70 duration-300"
                  type="button"
                  onClick={addRow}
                >
                  <MdLibraryAdd size="1.2em" /> Add Row
                </button>
                <button
                  className="w-full bg-blue text-white py-2 px-8 rounded cursor-pointer hover:bg-indigo-700 duration-300"
                  type="submit"
                >
                  Update Data
                </button>
              </form>
              <form
                onSubmit={handleSoftwareUpdate}
                className="shadow-soft-sm bg-white h-max py-4 px-2 sm:py-4 sm:px-5"
              >
                <h3 className="text-black  text-xl font-bold mb-6">
                  Update Software File
                </h3>
                <div className="min-w-[300px] mb-4 border border-slate-300 relative px-2 py-4 sm:py-4 sm:px-5 bg-white rounded-md">
                  <span className="absolute -top-2.5 left-5 bg-slate-200 border rounded-md px-3 text-blue text-sm">
                    Software Exe File
                  </span>
                  <input
                    className="w-full focus:outline-none cursor-pointer"
                    type="file"
                    multiple={false}
                    required
                    name="software"
                    onChange={(e) => {
                      setsoftwareFile(e.target.files[0]);
                    }}
                  />
                </div>
                <button
                  className="w-full bg-blue text-white py-2 px-8 rounded cursor-pointer hover:bg-indigo-700 duration-300"
                  type="submit"
                >
                  Update File
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditSubscription;
