import { HiArrowUpRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { CartItemProps } from "../Cart/CartX";
import Loader from "../Loader";

const ShippingItem = ({ cart, idx }: CartItemProps) => {
  if (!cart || !cart.pid) return <Loader />;

  const pid = cart.pid._id;

  return (
    <div
      className="shipItem"
      style={{ backgroundColor: `${idx % 2 === 0 ? "white" : "#faf6ff"}` }}
    >
      <div>
        <div>
          <img src={cart.pid.images[0].url} alt={cart.pid.name} />
          <p>{cart.quantity}</p>
        </div>
        <div>
          <Link to={`/product/${pid}`}>{cart.pid.name}</Link>
          <Link to={`/product/${pid}`}>
            <HiArrowUpRight />
          </Link>
        </div>
      </div>
      <div>
        <h4>₹{cart.pid.price}/-</h4>
      </div>
    </div>
  );
};

export default ShippingItem;
