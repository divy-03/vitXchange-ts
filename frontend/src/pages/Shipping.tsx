import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import data from "../assets/cartData.json";
import { useNavigate } from "react-router-dom";
import ShippingCard from "../components/cards/ShippingItem";
import useAuthGuard from "../tools/AuthGuard";
import { useGetCartItemsQuery } from "../RTK/CartApi";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../RTK/OrderApi";
import { toast } from "react-toastify";
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

interface shipInfoType {
  firstName: string;
  lastName: string;
  phone: number | undefined;
  campus: string;
  hostel: string;
  block: string;
  wing: string;
  room: string;
}

const Shipping = () => {
  useAuthGuard();
  const navigate = useNavigate();

  const { data, isLoading } = useGetCartItemsQuery({});

  if (isLoading) return <Loader />;

  let itemsPrice = data.cartItems.reduce((acc: number, p: CartItem) => {
    return acc + p.pid.price * p.quantity;
  }, 0);
  const tax: number = Math.round(itemsPrice * 0.18);
  const shippingPrice: number = 200;
  const discount: number = 500;
  const totalPrice = itemsPrice + tax + shippingPrice - discount;

  const [shippingInfo, setShippingInfo] = useState<shipInfoType>({
    firstName: "",
    lastName: "",
    phone: undefined,
    campus: "",
    hostel: "",
    block: "",
    wing: "",
    room: "",
  });
  const [payMethod, setPayMethod] = useState<string>("");

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (cartItems.length <= 0) return navigate("/");
  }, [cartItems, navigate]);

  const [createOrder, { isLoading: createLoad }] = useCreateOrderMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      shippingInfo,
      payMethod,
      shippingPrice,
      totalPrice,
      itemsPrice,
    };
    const result = await createOrder(body);
    if (!result.data.success) {
      return toast.error(result.data.error);
    }
    toast.success("Order Created");
    navigate(`/order/${result.data.order._id}`);
  };

  if (createLoad) return <Loader />;

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
            name="phone"
            placeholder="Phone Number"
            value={shippingInfo.phone}
            onChange={(e) =>
              setShippingInfo((prev) => ({
                ...prev,
                phone: parseInt(e.target.value, 10),
              }))
            }
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
            name="room"
            value={shippingInfo.room}
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
                checked={payMethod === "cashOnDelivery"}
                onChange={() => setPayMethod("cashOnDelivery")}
              />
              Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="onlinePayment"
                checked={payMethod === "onlinePayment"}
                onChange={() => setPayMethod("onlinePayment")}
              />
              Online Payment
            </label>
          </div>

          <button type="submit">Pay Now</button>
        </form>
      </div>
      <div className="orderSummary">
        <h2>Order Summary</h2>
        {data.cartItems.map((i: any, idx: number) => (
          <ShippingCard key={idx} cart={i} idx={idx} />
        ))}
        <div>
          <span>Subtotal:</span>
          <span>₹{totalPrice}</span>
        </div>
        <div>
          <span>ShippinCharges:</span>
          <span>₹{shippingPrice}</span>
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
          <b>₹{totalPrice}</b>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
