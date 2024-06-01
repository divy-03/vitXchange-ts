import { HiArrowUpRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

type shippingProps = {
  cart: any;
};

const ShippingItem = ({ cart }: shippingProps) => {
  const { name, id, photo, price, quantity } = cart;

  return (
    <div className="shipItem">
      <div>
        <div>
          <img src={photo} alt={name} />
          <p>{quantity}</p>
        </div>
        <div>
          <Link to={`/product/${id}`}>{name}</Link>
          <Link to={`/product/${id}`}>
            <HiArrowUpRight />
          </Link>
        </div>
      </div>
      <h3>₹{price}/-</h3>
    </div>
  );
};

export default ShippingItem;
