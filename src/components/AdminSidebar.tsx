import { IconType } from "react-icons";
import { Link, Location, useLocation } from "react-router-dom";
import { RiDashboardFill, RiShoppingBag3Fill } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import { AiFillFileText } from "react-icons/ai";
import { useState } from "react";

const AdminSidebar = () => {
  const location = useLocation();
  return (
    <aside>
      <h2>Logo</h2>
      <Dash location={location} />
      <Dash location={location} />
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
      <h5 onClick={handleClick}>Dashboard</h5>
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

const Li = ({ url, location, Icon, text }: LiProps) => (
  <li
    style={{
      backgroundColor: location.pathname.includes(url) ? "#ede8f5" : "white",
    }}
  >
    <Link
      to={url}
      style={{ color: location.pathname.includes(url) ? "#3d52a0" : "unset" }}
    >
      <Icon />
      {text}
    </Link>
  </li>
);

export default AdminSidebar;
