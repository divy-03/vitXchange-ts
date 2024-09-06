import CartItem from "../cards/cartItem";
import { BsCartPlus } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { MdPayment } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
import { useGetCartItemsQuery } from "../../RTK/CartApi";
import Loader from "../Loader";

export type CartItemProps = {
  cart: {
    pid: {
      images: { url: string; public_id: string; _id: string }[];
      name: string;
      _id: string;
      price: number;
    };
    quantity: number;
  };
  idx: number;
};

interface CartItem {
  pid: {
    _id: string;
    name: string;
    images: { url: string, public_id: string; _id: string }[];
    price: number;
  };
  quantity: number;
  _id: string;
}

const CartX = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetCartItemsQuery({});

  const handleOrder = () => {
    navigate("/shipping");
  };

  const handleChatSeller = () => {};

  if (isLoading) {
    return <Loader />;
  }

  if (!data || !data.cartItems) {
    return <Loader />;
  }

  let total = data.cartItems.reduce((acc: number, p: CartItem) => {
    return acc + p.pid.price * p.quantity;
  }, 0);

  console.log(total);
  return (
    <div className="cartXContainer">
      <div className="cartItemContainer">
        {data.cartItems.length === 0 ? (
          <h4>
            Add Product to Cart
            <BsCartPlus />
            <Link to={"../products"}>Continue Shopping</Link>
          </h4>
        ) : (
          data.cartItems.map((i: any, idx: number) => (
            <CartItem key={idx} cart={i} idx={idx} />
          ))
        )}
      </div>
      <div className="cartDetails">
        <div className="orderDetails">
          <b>Total</b>
          <b>{total}/-</b>
        </div>
        <button
          disabled={data.cartItems.length === 0}
          onClick={handleChatSeller}
        >
          Chat with Seller
          <FaMessage />
        </button>
        <button disabled={data.cartItems.length === 0} onClick={handleOrder}>
          Order <MdPayment />
        </button>
      </div>
    </div>
  );
};

export default CartX;
