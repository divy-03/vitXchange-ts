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
import { useGetUserMutation } from "./RTK/UserApi";

const Admin = lazy(() => import("./admin/Admin"));
const Home = lazy(() => import("./pages/Home"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/SignUp"));

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const [getUser] = useGetUserMutation();

  interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    __v: number;
  }

  const [user, setUser] = useState<User>({
    _id: "",
    name: "",
    email: "",
    role: "",
    __v: 0,
  });

  useEffect(() => {
    getUser({})
      .then((result) => {
        setUser(result.data.user);
      })
      .catch((error) => {
        console.log("Error fetching the token:", error);
        setUser({
          _id: "",
          email: "",
          name: "",
          role: "",
          __v: 0,
        });
      });
    getUser;
  }, [user]);

  return (
    <Suspense fallback={<Loader />}>
      {!isAdminRoute && <Navbar user={user} />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route>
          <Route path="/shipping" element={<Shipping />} />
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
      {!isAdminRoute && <Footer />}
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
