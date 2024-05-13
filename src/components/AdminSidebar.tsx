import { IconType } from "react-icons";
import { Link, Location, useLocation } from "react-router-dom";
import { RiCoupon3Fill, RiDashboardFill, RiShoppingBag3Fill } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import { AiFillFileText } from "react-icons/ai";
import { useState } from "react";
import { FaBitcoin, FaChartBar, FaChartLine, FaChartPie, FaGamepad, FaStopwatch } from "react-icons/fa";

const AdminSidebar = () => {
  const location = useLocation();
  return (
    <aside>
      <h2>Logo</h2>
      <Dash location={location} />
      <Charts location={location} />
      <Apps location={location} />
    </aside>
  );
};

interface LiProps {
  url: string;
  text: string;
  location: Location;
  Icon: IconType;
}

const Dash = ({ location }: { location: Location }) => {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };
  return (
    <div>
      <button onClick={handleClick}>Dashboard</button>
      <ul className={`${click ? "full" : "closed"}`}>
        <Li
          url="/admin/dashboard"
          Icon={RiDashboardFill}
          text="Dashboard"
          location={location}
        />
        <Li
          url="/admin/product"
          Icon={RiShoppingBag3Fill}
          text="Product"
          location={location}
        />
        <Li
          url="/admin/customer"
          Icon={IoIosPeople}
          text="Customer"
          location={location}
        />
        <Li
          url="/admin/transaction"
          Icon={AiFillFileText}
          text="Transaction"
          location={location}
        />
      </ul>
    </div>
  );
};

const Charts = ({ location }: { location: Location }) => {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };
  return (
    <div>
      <button onClick={handleClick}>Charts</button>
      <ul className={`${click ? "full" : "closed"}`}>
        <Li
          url="/admin/bar"
          Icon={FaChartBar}
          text="Bar"
          location={location}
        />
        <Li
          url="/admin/pie"
          Icon={FaChartPie}
          text="Pie"
          location={location}
        />
        <Li
          url="/admin/line"
          Icon={FaChartLine}
          text="Line"
          location={location}
        />
      </ul>
    </div>
  );
};

const Apps = ({ location }: { location: Location }) => {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };
  return (
    <div>
      <button onClick={handleClick}>Apps</button>
      <ul className={`${click ? "full" : "closed"}`}>
        <Li
          url="/admin/stopwatch"
          Icon={FaStopwatch}
          text="Stopwatch"
          location={location}
        />
        <Li
          url="/admin/coupon"
          Icon={RiCoupon3Fill}
          text="Coupon"
          location={location}
        />
        <Li
          url="/admin/toss"
          Icon={FaBitcoin}
          text="Toss"
          location={location}
        />
      </ul>
    </div>
  );
};

const Li = ({ url, location, Icon, text }: LiProps) => (
  <li
    style={{
      backgroundColor: location.pathname.includes(url) ? "#ede8f5" : "white",
    }}
  >
    <Link
      to={url}
      style={{ color: location.pathname.includes(url) ? "#3d52a0" : "#26293ad5" }}
    >
      <Icon />
      {text}
    </Link>
  </li>
);

export default AdminSidebar;
