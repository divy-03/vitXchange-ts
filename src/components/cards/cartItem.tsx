import { HiArrowUpRight } from "react-icons/hi2";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

type CartItemProps = {
  cart: any;
  idx: number;
};

const CartItem = ({ cart, idx }: CartItemProps) => {
  const { name, id, photo, price, quantity } = cart;
  return (
    <div
      className="cartItem"
      style={{ backgroundColor: `${idx&1 ? "white" : "#faf6ff"}` }}
    >
      <img src={photo} alt={name} />
      <div>
        <Link to={`/product/${id}`}>{name}</Link>
        <Link to={`/product/${id}`}>
          <HiArrowUpRight />
        </Link>
      </div>
      <div>
        <button>-</button>
        <p>{quantity}</p>
        <button>+</button>
      </div>
      <p>₹{price}/-</p>
      <button>
        <MdDeleteForever className="deleteIcon" />
        <span className="deleteTxt">DELETE</span>
      </button>
    </div>
  );
};

export default CartItem;
