import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
// import jwt from "jsonwebtoken";
import Loader from "./components/Loader";
import Navbar from "./components/header/Navbar";
import Footer from "./components/footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetUserProfileMutation } from "./RTK/UserApi";

const Admin = lazy(() => import("./admin/Admin"));
const Home = lazy(() => import("./pages/Home"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Login = lazy(() => import("./pages/Login"));
const Reset = lazy(() => import("./pages/Reset"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));

const App = () => {
  const location = useLocation();
  const navVisible =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/account") ||
    location.pathname.startsWith("/me");
  const [getUserProfile] = useGetUserProfileMutation();

  interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    avatar: {
      public_id: string;
      url: string;
    };
    __v: number;
  }

  const [user, setUser] = useState<User>({
    _id: "",
    name: "",
    email: "",
    role: "",
    avatar: {
      public_id: "",
      url: "",
    },
    __v: 0,
  });

  useEffect(() => {
    getUserProfile({})
      .then((result) => {
        // console.log(result.data.user);
        setUser(result.data.user);
      })
      .catch(() => {
        setUser({
          _id: "",
          email: "",
          name: "",
          role: "",
          avatar: {
            public_id: "",
            url: "",
          },
          __v: 0,
        });
      });
    getUserProfile;
  }, [location.pathname]);

  return (
    <Suspense fallback={<Loader />}>
      {!navVisible && <Navbar user={user} />}
      <Routes>
        <Route path="/account" element={<Login />} />
        <Route path="/reset/:token" element={<Reset />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route>
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/me" element={<UserProfile user={user} />} />
        </Route>
        {user.role === "admin" && <Route path="/admin/*" element={<Admin />} />}
        <Route path="/" element={<Home />} />
      </Routes>
      <div className="toastContainer">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
      {!navVisible && <Footer />}
    </Suspense>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppRouter;
