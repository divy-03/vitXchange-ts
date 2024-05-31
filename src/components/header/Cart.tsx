import { useState, useEffect } from "react";
import { FaMessage, FaX } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";

type Props = {
  cartActive: boolean;
  setCartActive: (active: boolean) => void;
};

const fixedPrice = 2000;

const Cart = ({ cartActive, setCartActive }: Props) => {
  const [isActive, setIsActive] = useState<boolean>(cartActive);

  useEffect(() => {
    setIsActive(cartActive);
  }, [cartActive]);

  const handleClose = () => {
    setIsActive((prev) => !prev);
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
      <div className="cartItemContainer">container</div>
      <div className="cartDetails">
        <div className="orderDetails">
          <b>Total</b>
          <b>₹{fixedPrice}/-</b>
        </div>
        <button>
          Chat with Seller 
          <FaMessage />
        </button>
        <button>Order <MdPayment /></button>
      </div>
    </aside>
  );
};

export default Cart;
