import { useState, useEffect } from "react";
import { FaMessage, FaX } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import CartItem from "../cards/cartItem";
import data from "../../assets/cartData.json";
import { BsCartPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

type Props = {
  cartActive: boolean;
  setCartActive: (active: boolean) => void;
};

const fixedPrice = 2000;
const cartItems = data.cartItems;
const Cart = ({ cartActive, setCartActive }: Props) => {
  const [isActive, setIsActive] = useState<boolean>(cartActive);

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
  };

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
          cartItems.map((i, idx) => <CartItem key={idx} cart={i} idx={idx} />)
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
