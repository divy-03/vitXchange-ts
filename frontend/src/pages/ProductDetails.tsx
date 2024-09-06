import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../RTK/ProductApi";
import Loader from "../components/Loader";
import { useAddToCartMutation, useGetCartItemsQuery } from "../RTK/CartApi";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { pid } = useParams();
  const { data, error, isLoading } = useGetProductDetailsQuery(pid);
  const { refetch } = useGetCartItemsQuery({});
  const [addToCart, { isLoading: cartLoad }] = useAddToCartMutation();
  if (error) {
    return <div>Failed to load Product</div>;
  }

  if (isLoading || cartLoad) {
    return <Loader />;
  }

  const handleAddtoCart = async () => {
    try {
      const result = await addToCart({ pid }).unwrap();
      toast.success(result.message);
      refetch();
    } catch (error) {
      toast.error("Failed to add to cart. Please try again.");
    }
  };
  const handleBuyNow = () => {};

  return (
    <div className="productDetails">
      <div>{/* <img src={data.product.images[0].url} alt="asdas" /> */}</div>
      <div>
        <div>
          <h2>{data.product.name}</h2>
          <p>Product # {pid}</p>
          <div>
            <span>Description: </span>
            <span>{data.product.description}</span>
          </div>
        </div>

        <div>
          <span>Price: ₹{data.product.price}/-</span>
        </div>

        <button onClick={handleAddtoCart}>Add To Cart</button>
        <button onClick={handleBuyNow}>Buy Now</button>
      </div>
    </div>
  );
};

export default ProductDetails;
