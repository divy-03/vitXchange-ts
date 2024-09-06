import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import data from "../assets/cartData.json";
import { useNavigate } from "react-router-dom";
import ShippingCard from "../components/cards/ShippingItem";
import useAuthGuard from "../tools/AuthGuard";
import { useGetCartItemsQuery } from "../RTK/CartApi";
import Loader from "../components/Loader";
const cartItems = data.cartItems;

interface CartItem {
  pid: {
    _id: string;
    name: string;
    images: { url: string; public_id: string; _id: string }[];
    price: number;
  };
  quantity: number;
  _id: string;
}

const Shipping = () => {
  useAuthGuard();
  const navigate = useNavigate();

  const { data, isLoading } = useGetCartItemsQuery({});

  if (isLoading) return <Loader />;

  let subTotal = data.cartItems.reduce((acc: number, p: CartItem) => {
    return acc + p.pid.price * p.quantity;
  }, 0);
  const tax: number = Math.round(subTotal * 0.18);
  const shippingCharges: number = 200;
  const discount: number = 500;
  const total = subTotal + tax + shippingCharges - discount;

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    campus: "",
    hostel: "",
    block: "",
    wing: "",
    roomNo: "",
    paymentMethod: "",
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (cartItems.length <= 0) return navigate("/");
  }, [cartItems, navigate]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(shippingInfo);
  };

  return (
    <div className="shippingContainer">
      <div className="shippingDetails">
        <h2>Shipping Info</h2>
        <form onSubmit={handleSubmit}>
          <h2>
            <span>1</span>Delivery Info
          </h2>
          <input
            type="text"
            required
            name="firstName"
            placeholder="First Name"
            value={shippingInfo.firstName}
            onChange={changeHandler}
          />
          <input
            type="text"
            required
            name="lastName"
            placeholder="Last Name"
            value={shippingInfo.lastName}
            onChange={changeHandler}
          />
          <input
            type="number"
            required
            name="phoneNo"
            placeholder="Phone Number"
            value={shippingInfo.phoneNo}
            onChange={changeHandler}
          />
          <select
            name="campus"
            value={shippingInfo.campus}
            onChange={changeHandler}
            required
          >
            <option value="">Choose Campus</option>
            <option value="vellore">Vit Vellore</option>
            <option value="chennai">Vit Chennai</option>
            <option value="amravati">Vit Amravati</option>
            <option value="bhopal">Vit Bhopal</option>
          </select>
          <select
            name="hostel"
            required
            value={shippingInfo.hostel}
            onChange={changeHandler}
          >
            <option value="">Choose Hostel</option>
            <option value="boys">Boys Hostel</option>
            <option value="girls">Girls Hostel</option>
          </select>
          <input
            type="text"
            name="block"
            required
            onChange={changeHandler}
            placeholder="Hostel Block Number"
            value={shippingInfo.block}
          />
          <select
            name="wing"
            onChange={changeHandler}
            value={shippingInfo.wing}
          >
            <option value="">Choose Wing</option>
            <option value="a">A Wing</option>
            <option value="b">B Wing</option>
          </select>
          <input
            type="text"
            onChange={changeHandler}
            required
            name="roomNo"
            value={shippingInfo.roomNo}
            placeholder="Room No."
          />

          <h2>
            <span>2</span>Payment Method
          </h2>
          <div>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cashOnDelivery"
                checked={shippingInfo.paymentMethod === "cashOnDelivery"}
                onChange={changeHandler}
              />
              Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="onlinePayment"
                checked={shippingInfo.paymentMethod === "onlinePayment"}
                onChange={changeHandler}
              />
              Online Payment
            </label>
          </div>

          <button type="submit">Pay Now</button>
        </form>
      </div>
      <div className="orderSummary">
        <h2>Order Summary</h2>
        {data.cartItems.map((i:any, idx:number) => (
          <ShippingCard key={idx} cart={i} idx={idx}/>
        ))}
        <div>
          <span>Subtotal:</span>
          <span>₹{subTotal}</span>
        </div>
        <div>
          <span>ShippinCharges:</span>
          <span>₹{shippingCharges}</span>
        </div>
        <div>
          <span>Tax:</span>
          <span>₹{tax}</span>
        </div>
        <div>
          <span>Discount:</span>
          <em>-₹{discount}</em>
        </div>
        <div>
          <b>Total:</b>
          <b>₹{total}</b>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
