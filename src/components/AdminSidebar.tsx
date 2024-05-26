import { IconType } from "react-icons";
import { Link, Location, useLocation } from "react-router-dom";
import {
  RiCoupon3Fill,
  RiDashboardFill,
  RiShoppingBag3Fill,
} from "react-icons/ri";
import { IoIosArrowForward, IoIosPeople } from "react-icons/io";
import { AiFillFileText } from "react-icons/ai";
import { useState } from "react";
import {
  FaBitcoin,
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaStopwatch,
} from "react-icons/fa";

const AdminSidebar = () => {
  const location = useLocation();
  return (
    <aside>
      <div>
        <Link to="/" className="logo">
          <span className="V">V</span>
          <span className="X">X</span>
        </Link>
        <Link to="/" className="logoTxt">
          VIT
        </Link>
        <Link to="/" className="X">
          X
        </Link>
        <Link to="/" className="logoTxt">
          change
        </Link>
      </div>
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
  const [isRotated, setIsRotated] = useState(false);
  const handleClick = () => {
    setIsRotated(!isRotated);
    setClick(!click);
  };
  return (
    <div>
      <button onClick={handleClick}>
        Dashboard{" "}
        <IoIosArrowForward
          style={{
            transition: "0.5s",
            transform: isRotated ? "rotate(90deg)" : "none",
          }}
        />
      </button>
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
  const [isRotated, setIsRotated] = useState(false);
  const handleClick = () => {
    setIsRotated(!isRotated);
    setClick(!click);
  };
  return (
    <div>
      <button onClick={handleClick}>Charts<IoIosArrowForward
          style={{
            transition: "0.5s",
            transform: isRotated ? "rotate(90deg)" : "none",
          }}
        /></button>
      <ul className={`${click ? "full" : "closed"}`}>
        <Li url="/admin/bar" Icon={FaChartBar} text="Bar" location={location} />
        <Li url="/admin/pie" Icon={FaChartPie} text="Pie" location={location} />
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
  const [isRotated, setIsRotated] = useState(false);
  const handleClick = () => {
    setIsRotated(!isRotated);
    setClick(!click);
  };
  return (
    <div>
      <button onClick={handleClick}>Apps<IoIosArrowForward
          style={{
            transition: "0.5s",
            transform: isRotated ? "rotate(90deg)" : "none",
          }}
        /></button>
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
      backgroundColor: location.pathname.includes(url)
        ? "#ede8f5"
        : "transparent",
    }}
  >
    <Link
      to={url}
      style={{ color: location.pathname.includes(url) ? "#3d52a0" : "#ede8f5" }}
    >
      <Icon />
      {text}
    </Link>
  </li>
);

export default AdminSidebar;
