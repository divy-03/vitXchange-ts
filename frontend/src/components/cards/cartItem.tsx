import { HiArrowUpRight } from "react-icons/hi2";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import {
  useAddToCartMutation,
  useDecreaseQuantMutation,
  useGetCartItemsQuery,
  useRemoveFromCartMutation,
} from "../../RTK/CartApi";
import { CartItemProps } from "../Cart/CartX";
import { toast } from "react-toastify";

const CartItem = ({ cart, idx }: CartItemProps) => {
  const { refetch } = useGetCartItemsQuery({});
  if (!cart || !cart.pid) {
    return <Loader />; // Handle missing data
  }

  const pid = cart.pid._id;

  // Mutation hooks for increasing/decreasing quantity
  const [decreaseQuant, { isLoading: isLoadingDecrease }] =
    useDecreaseQuantMutation();
  const [addToCart, { isLoading: isLoadingAdd }] = useAddToCartMutation();
  const [removeFromCart, { isLoading: isLoadingDelete }] =
    useRemoveFromCartMutation();

  // Decrease quantity handler
  const handleMinus = async () => {
    try {
      const result = await decreaseQuant({ pid }).unwrap();
      toast.success(result.message);
      refetch();
    } catch (error) {
      toast.error("Failed to decrease quantity. Please try again.");
    }
  };

  const handlePlus = async () => {
    try {
      const result = await addToCart({ pid }).unwrap();
      toast.success(result.message);
      refetch();
    } catch (error) {
      toast.error("Failed to add to cart. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const result = await removeFromCart({ pid }).unwrap();
      toast.success(result.message);
      refetch();
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  // Disable buttons while loading to avoid multiple requests
  const isLoading = isLoadingDecrease || isLoadingAdd || isLoadingDelete;

  return (
    <div
      className="cartItem"
      style={{ backgroundColor: `${idx % 2 === 0 ? "white" : "#faf6ff"}` }}
    >
      <img src={cart.pid.images[0].url} alt={cart.pid.name} />
      <div>
        <Link to={`/product/${cart.pid._id}`}>{cart.pid.name}</Link>
        <Link to={`/product/${cart.pid._id}`}>
          <HiArrowUpRight />
        </Link>
      </div>
      <div>
        <button onClick={handleMinus} disabled={isLoading}>
          -
        </button>
        <p>{cart.quantity}</p>
        <button onClick={handlePlus} disabled={isLoading}>
          +
        </button>
      </div>
      <p>₹{cart.pid.price}/-</p>
      <button onClick={handleDelete} disabled={isLoading}>
        <MdDeleteForever className="deleteIcon" />
        <span className="deleteTxt">DELETE</span>
      </button>
    </div>
  );
};

export default CartItem;
