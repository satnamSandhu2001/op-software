import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdLibraryAdd } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import UserSidebar from '../../components/UserSidebar';
import { loadingFalse, loadingTrue } from '../../store/actions/orderAction';
import MetaData from '../../components/MetaData';

const NewSubscription = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  const [subscription, setsubscription] = useState({ name: '' });
  const [editDataSubscription, seteditDataSubscription] = useState([
    {
      name: '',
      description: '',
      price: 0,
      expiryMonth: 0,
      _id: randomString(24),
    },
  ]);
  const [softwareFile, setsoftwareFile] = useState(null);
  const [uploadProgress, setuploadProgress] = useState(0);

  function randomString(string_length) {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyz';
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars[rnum];
    }
    return randomstring;
  }

  const handleEditDataSubscriptionInput = (e, _id, type) => {
    seteditDataSubscription((current) =>
      current.map((obj) => {
        if (obj._id === _id) {
          if (type === 'price' || type === 'expiryMonth') {
            if (e.target.value < 0) return obj;
          }
          return { ...obj, [type]: e.target.value };
        }
        return obj;
      })
    );
  };

  const handleDataSubmit = async (e) => {
    e.preventDefault();
    dispatch(loadingTrue());
    if (!editDataSubscription || !subscription.name || !softwareFile) return;
    for (let i = 0; i < editDataSubscription.length; i++) {
      editDataSubscription[i].expiryTime =
        editDataSubscription[i].expiryMonth * 2629800000;
      delete editDataSubscription[i]._id;
    }
    try {
      let formData = {
        name: subscription.name,
        software: softwareFile,
        item: [...editDataSubscription],
      };
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      // const { data } = await axios.post(`/api/v1/software`, formData, config);
      const { data } = await axios.post(`/api/v1/software`, formData, {
        onUploadProgress: (e) => {
          let percent = Math.floor((100 * e.loaded) / e.total);
          setuploadProgress(percent);
        },
        headers: config.headers,
      });
      toast.success(data.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/panel/admin/subscriptions');
    } catch (error) {
      console.log(error);
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
      setuploadProgress(0);
      dispatch(loadingFalse());
    }
  };

  const addRow = () => {
    seteditDataSubscription((current) => [
      ...current,
      {
        description: '',
        expiryMonth: 0,
        name: '',
        price: 0,
        _id: randomString(24).toLocaleLowerCase(),
      },
    ]);
  };
  const deleteRow = (_id, i) => {
    if (i === 0) return;
    let prompt = window.confirm('Really want to remove subscription row?');
    if (!prompt) return;
    seteditDataSubscription(
      editDataSubscription.filter((item) => item._id !== _id)
    );
  };

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  return (
    <>
      {' '}
      <MetaData title={`OpSoftware - Add New Subscription `} />
      <ToastContainer />
      <div className="flex bg-gray-100">
        <UserSidebar activeTab="subscriptions" />
        <div className="pt-24 sm:pt-28 lg:pt-36 px-4 sm:px-12 lg:pl-14 lg:pr-20 w-full overflow-hidden">
          {subscription && editDataSubscription.length !== 0 && (
            <div className="w-full my-8 flex flex-col-reverse gap-6 lg:flex-row">
              <form
                className="w-full shadow-soft-sm bg-white h-max py-4 px-2 sm:py-4 sm:px-5"
                onSubmit={handleDataSubmit}
              >
                {/* software name */}
                <h3 className="text-black text-xl font-bold mb-6">
                  Edit Subscription & Software
                </h3>
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
                {editDataSubscription.length !== 0 &&
                  editDataSubscription.map((product, i) => {
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
                            onClick={() => deleteRow(product._id, i)}
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
            </div>
          )}
        </div>
      </div>
      {uploadProgress !== 0 && (
        <div className="select-none flex items-center justify-center h-screen w-screen fixed top-0 left-0 z-50">
          <div className="text-4xl font-bold text-white">{uploadProgress}%</div>
        </div>
      )}
    </>
  );
};

export default NewSubscription;
