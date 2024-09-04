import CartItem from "../cards/cartItem";
import { BsCartPlus } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { MdPayment } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
import { useGetCartItemsQuery } from "../../RTK/OrderApi";
import Loader from "../Loader";

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

  return (
    <div className="cartXContainer">
      <div className="cartItemContainer">
        {data.cartItems.length === 0 ? (
          <h4>
            Add Product to Cart
            <BsCartPlus />
            <Link to={"./products"}>Continue Shopping</Link>
          </h4>
        ) : (
          data.cartItems.map((i: number, idx: number) => (
            <CartItem key={idx} cart={i} idx={idx} />
          ))
        )}
      </div>
      <div className="cartDetails">
        <div className="orderDetails">
          <b>Total</b>
          <b>₹{200}/-</b>
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
