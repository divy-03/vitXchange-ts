import { useState, useEffect } from "react";
import { FaMessage, FaX } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import CartItem from "../cards/cartItem";
import { BsCartPlus } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useGetCartItemsQuery } from "../../RTK/CartApi";
import Loader from "../Loader";

type Props = {
  cartActive: boolean;
  setCartActive: (active: boolean) => void;
};

const fixedPrice = 2000;

const Cart = ({ cartActive, setCartActive }: Props) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState<boolean>(cartActive);
  const { data, isLoading } = useGetCartItemsQuery({});
  const cartItems = data.cartItems;
  console.log(cartItems);

  useEffect(() => {
    setIsActive(cartActive);
  }, [cartActive]);

  const handleClose = () => {
    setIsActive((prev) => !prev);
    setCartActive(!isActive);
  };

  const handleChatSeller = () => {
    setCartActive(!isActive);
  };

  const handleOrder = () => {
    setCartActive(!isActive);
    navigate("/shipping");
  };

  if (isLoading) return <Loader />;

  return (
    <aside className={`cartContainer ${isActive ? "cartShow" : ""}`}>
      <div className="cartNav">
        <h2>Cart</h2>
        <button onClick={handleClose}>
          <FaX />
        </button>
      </div>
      <div className="cartItemContainer">
        {cartItems.length === 0 ? (
          <h4>
            Add Product to Cart
            <BsCartPlus />
            <Link to={"./products"} onClick={() => setCartActive(!isActive)}>
              Continue Shopping
            </Link>
          </h4>
        ) : (
          cartItems.map((i: number, idx: number) => (
            <CartItem key={idx} cart={i} idx={idx} />
          ))
        )}
      </div>
      <div className="cartDetails">
        <div className="orderDetails">
          <b>Total</b>
          <b>₹{fixedPrice}/-</b>
        </div>
        <button disabled={cartItems.length === 0} onClick={handleChatSeller}>
          Chat with Seller
          <FaMessage />
        </button>
        <button disabled={cartItems.length === 0} onClick={handleOrder}>
          Order <MdPayment />
        </button>
      </div>
    </aside>
  );
};

export default Cart;
