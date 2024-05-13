import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "../components/Loader";
import AdminSidebar from "../components/AdminSidebar";

const Dashboard = lazy(() => import("./Dashboard"));
const Products = lazy(() => import("./Products"));
const Customers = lazy(() => import("./Customers"));
const Transaction = lazy(() => import("./Transaction"));

const Admin = () => {
  return (
      <Suspense fallback={<Loader/>}>
        <AdminSidebar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product" element={<Products />} />
          <Route path="/customer" element={<Customers />} />
          <Route path="/transaction" element={<Transaction />} />
        </Routes>
      </Suspense>
  );
};

export default Admin;
