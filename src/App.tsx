import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/header/Navbar";
import Footer from "./components/footer/Footer";

const Admin = lazy(() => import("./admin/Admin"));
const Home = lazy(() => import("./pages/Home"));
const Shipping = lazy(() => import("./pages/Shipping"));

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <Suspense fallback={<Loader />}>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route>
          <Route path="/shipping" element={<Shipping />} />
        </Route>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/" element={<Home />} />
      </Routes>
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
