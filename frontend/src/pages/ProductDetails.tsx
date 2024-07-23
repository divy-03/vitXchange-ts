import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../RTK/ProductApi";
import Loader from "../components/Loader";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetProductDetailsQuery(id);

  
  if (error) {
    return <div>Failed to load Product</div>;
  }
  
  if (isLoading) {
    return <Loader />;
  }
  console.log(data.product);
  
  return (
    <div className="productDetails">
      <div>
        {/* <img src={data.product.images[0].url} alt="asdas" /> */}
      </div>
      <div>
        <div>
          <h2>{data.product.name}</h2>
          <p>Product # {id}</p>
          <div>
            <span>Description: </span>
            <span>{data.product.description}</span>
          </div>
        </div>

        <div>
          <span>Price: ₹{data.product.price}/-</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
