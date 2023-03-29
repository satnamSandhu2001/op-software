import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './layout/Home/Home';
import Account from './layout/user/Account';
import Login from './layout/Login';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import { useEffect, useState } from 'react';
import { loadUser } from './store/actions/userAction';
import ResetPassword from './layout/user/ResetPassword';
import Pricing from './layout/Pricing/Pricing';
import Payment from './layout/user/Payment';
import axios from 'axios';
import Subscriptions from './layout/user/Subscriptions';
import SubscriptionsAdmin from './layout/admin/SuscriptionsAdmin';
import Statics from './layout/admin/Statics';
import UserList from './layout/admin/UserList';
import Orders from './layout/admin/Orders';
import EditSubscription from './layout/admin/EditSubscription';
import NewSubscription from './layout/admin/NewSubscription';
import SingleUser from './layout/admin/SingleUser';
import Footer from './components/Footer';
import NotFound from './layout/Home/NotFound';
import Contact from './layout/Contact';

function App() {
  const { loading } = useSelector((state) => state.user);
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: forgotLoading } = useSelector(
    (state) => state.forgotPassword
  );
  const { loading: deleteLoading } = useSelector(
    (state) => state.deleteAccount
  );
  const { loading: resetPasswordLoading } = useSelector(
    (state) => state.resetPassword
  );
  const { loading: softwareLoading } = useSelector((state) => state.software);
  const { loading: orderLoading } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  const [razorpayApiKey, setrazorpayApiKey] = useState('');

  async function getrazorpayApiKey() {
    try {
      const { data } = await axios.get('/api/v1/razorpayApiKey');
      setrazorpayApiKey(data.key);
    } catch (error) {}
  }

  useEffect(() => {
    dispatch(loadUser());
    getrazorpayApiKey();
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      {(loading ||
        profileLoading ||
        deleteLoading ||
        forgotLoading ||
        resetPasswordLoading ||
        orderLoading ||
        softwareLoading) && <Loader />}

      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/password/reset/:id" element={<ResetPassword />} />

        {/* user protected routes */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/panel/account" element={<Account />} />
          <Route path="/panel/subscriptions" element={<Subscriptions />} />

          <Route
            path="/payment"
            element={<Payment razorpayApiKey={razorpayApiKey} />}
          />
        </Route>
        <Route path="/" element={<AdminProtectedRoute />}>
          <Route path="/panel/statics" element={<Statics />} />
          <Route path="/panel/users" element={<UserList />} />
          <Route path="/panel/user/:id" element={<SingleUser />} />
          <Route path="/panel/orders" element={<Orders />} />
          <Route
            path="/panel/admin/subscriptions"
            element={<SubscriptionsAdmin />}
          />
          <Route
            path="/panel/admin/new-software"
            element={<NewSubscription />}
          />
          <Route
            path="/panel/admin/subscription/:id"
            element={<EditSubscription />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
