import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { RiEdit2Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import AccountDeleteModalAdmin from '../../components/AccountDeleteModalAdmin';
import UserSidebar from '../../components/UserSidebar';
import { loadingFalse, loadingTrue } from '../../store/actions/orderAction';
import { loadUser } from '../../store/actions/userAction';
import exclamation_video from '../../video/exclamation-mark.mp4';
import MetaData from '../../components/MetaData';

const UserList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const [users, setusers] = useState([]);
  const [deleteDialog, setdeleteDialog] = useState({
    _id: null,
  });

  const getUsers = async () => {
    try {
      dispatch(loadingTrue());
      const { data } = await axios.get('/api/v1/users');
      setusers([...data.users]);
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
  const handleRoleChange = async ({ _id, role }) => {
    try {
      dispatch(loadingTrue());
      await axios.put(`/api/v1/user/${_id}`, { role });
      getUsers();
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

  const hideDeleteDialog = () => {
    setdeleteDialog({ _id: null });
  };
  const handleDeleteUser = async () => {
    if (!deleteDialog._id) {
      setdeleteDialog({ _id: null });
    }
    try {
      dispatch(loadingTrue());
      const { data } = await axios.delete(`/api/v1/user/${deleteDialog._id}`);
      toast.error(data.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      if (user?._id === deleteDialog._id) {
        return dispatch(loadUser());
      }
      getUsers();
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
      setdeleteDialog({ _id: null });
    }
  };

  useEffect(() => {
    getUsers();
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <MetaData title={`OpSoftware - Users List`} />
      <ToastContainer />
      <div className="flex bg-gray-100">
        <UserSidebar activeTab="users" />
        <div className="pt-24 sm:pt-28 lg:pt-36 px-4 sm:px-12 lg:px-14 w-full overflow-hidden">
          <h3 className="text-xl font-bold w-fit text-black relative after:content-[''] after:absolute after:-bottom-1 after:w-full after:h-[2px] after:bg-black after:left-0 mb-4">
            All Users
          </h3>
          <div className="overflow-x-auto pb-8 mb-16">
            {users?.length !== 0 ? (
              <table className="rounded-md overflow-x-hidden">
                <thead className="bg-blue">
                  <tr className="text-white">
                    <th className="min-w-[170px] text-left whitespace-nowrap px-4 pl-4 py-3 border-l border-white border-l-blue">
                      Name
                    </th>
                    <th className="text-left whitespace-nowrap px-4 py-3 border-l-2 border-white">
                      Email
                    </th>
                    <th className="text-left whitespace-nowrap px-4 py-3 border-l-2 border-white">
                      User Role
                    </th>
                    <th className="text-left whitespace-nowrap px-4 py-3 border-l-2 border-white">
                      Account Created
                    </th>
                    <th className="text-left whitespace-nowrap px-4 border-l-2 border-white">
                      Edit
                    </th>
                    <th className="text-left whitespace-nowrap px-4 border-l-2 border-white">
                      Del.
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((item, i) => {
                    return (
                      <tr key={i} className="even:bg-indigo-100">
                        <td className="py-3 border whitespace-nowrap border-black/10 px-4 font-semibold text-blue/70 hover:bg-slate-300 duration-300">
                          <Link to={`/panel/user/${item._id}`}>
                            {item.name}
                          </Link>
                        </td>
                        <td className="py-3 border whitespace-nowrap border-black/10 px-4">
                          {item.email}
                        </td>
                        <td className="py-3 border border-black/10 px-4 whitespace-nowrap">
                          {item.role}
                        </td>
                        <td className="whitespace-nowrap py-3 border border-black/10 px-4 ">
                          {item.createdAt.slice(0, 10)}
                        </td>

                        <td className="rounded duration-300 cursor-pointer h-full hover:bg-gray-500 hover:text-white text-blue py-3 border border-black/10 px-4 relative group hover:shadow-soft-xl">
                          <RiEdit2Fill size="1.3em" className="mx-auto" />
                          <div className="overflow-hidden absolute top-0 right-full scale-x-0 group-hover:scale-x-100 duration-300 origin-right bg-gray-500 z-20 text-white rounded-l rounded-br font-extralight">
                            <button
                              onClick={() =>
                                handleRoleChange({
                                  _id: item._id,
                                  role: 'user',
                                })
                              }
                              disabled={item.role === 'user' ? true : false}
                              className={`${
                                item.role === 'user'
                                  ? 'cursor-not-allowed'
                                  : 'cursor-pointer'
                              } w-full text-left py-2 px-4 hover:bg-gray-700 whitespace-nowrap rounded`}
                            >
                              Role = <strong>User</strong>
                            </button>
                            <button
                              onClick={() =>
                                handleRoleChange({
                                  _id: item._id,
                                  role: 'admin',
                                })
                              }
                              disabled={item.role === 'admin' ? true : false}
                              className={`${
                                item.role === 'admin'
                                  ? 'cursor-not-allowed'
                                  : 'cursor-pointer'
                              } w-full text-left py-2 px-4 hover:bg-gray-700 whitespace-nowrap rounded`}
                            >
                              Role = <strong>Admin</strong>
                            </button>
                          </div>
                        </td>
                        <td
                          onClick={() => setdeleteDialog({ _id: item._id })}
                          className="rounded duration-300 cursor-pointer h-full hover:bg-slate-300 text-blue py-3 border border-black/10 px-4 relative group hover:shadow-soft-xl"
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
                  No user accounts found.
                </p>
              </span>
            )}
          </div>
        </div>
      </div>
      {deleteDialog?._id && (
        <AccountDeleteModalAdmin
          cancel={hideDeleteDialog}
          confirm={handleDeleteUser}
        />
      )}{' '}
    </>
  );
};

export default UserList;
