import { HiArrowUpRight } from "react-icons/hi2";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import Loader from "../Loader";

type CartItemProps = {
  cart: any;
  idx: number;
};

const CartItem = ({ cart, idx }: CartItemProps) => {
  // const { name, id, photo, price, quantity } = cart;
  if (cart.pid === undefined) {
    return <Loader />;
  }
  return (
    <div
      className="cartItem"
      style={{ backgroundColor: `${idx & 1 ? "white" : "#faf6ff"}` }}
    >
      <img src={cart.pid.images[0].url} alt={cart.pid.name} />
      <div>
        <Link to={`/product/${cart.pid._id}`}>{cart.pid.name}</Link>
        <Link to={`/product/${cart.pid._id}`}>
          <HiArrowUpRight />
        </Link>
      </div>
      <div>
        <button>-</button>
        <p>{cart.quantity}</p>
        <button>+</button>
      </div>
      <p>₹{cart.pid.price}/-</p>
      <button>
        <MdDeleteForever className="deleteIcon" />
        <span className="deleteTxt">DELETE</span>
      </button>
    </div>
  );
};

export default CartItem;
