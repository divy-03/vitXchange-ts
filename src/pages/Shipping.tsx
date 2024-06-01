import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import data from "../assets/cartData.json";
import { useNavigate } from "react-router-dom";
const cartItems = data.cartItems;

const Shipping = () => {
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    campus: "",
    hostel: "",
    block: "",
    wing: "",
    roomNo: "",
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (cartItems.length <= 0) return navigate("/");
  }, [cartItems]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="shippingContainer">
      <div className="shippingDetails">
        {/* <button>Chat with Seller</button> */}
        <form onSubmit={handleSubmit}>
          <h2>Shipping Address</h2>
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
            <option value="b">B wing</option>
          </select>
          <input
            type="text"
            onChange={changeHandler}
            required
            name="roomNo"
            value={shippingInfo.roomNo}
            placeholder="Room No."
          />
          {/* <button type="submit">Pay Now</button> */}
        </form>
      </div>
      <div className="orderSummary">
        <h2>Order Summary</h2>
      </div>
    </div>
  );
};

export default Shipping;
