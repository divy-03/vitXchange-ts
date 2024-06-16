import { Link } from "react-router-dom";

type ProductsProps = {
  id: string;
  img: string;
  name: string;
  priceType: string;
  fixedPrice: number;
  stock: number;
  //   handler: (cartItem: CartItem) => string | undefined;
};

const ProductCard = ({id, img, name, fixedPrice, priceType}:ProductsProps) => {
  return (
    <div className="proCardContainer">
      <img src={img} alt="HeroImg" />
      {/* <button onClick={handleWishList}>
        <i
          className="fa fa-solid fa-heart"
          style={{ color: wishListed ? "red" : "gray" }}
        ></i>
      </button> */}

      <Link to={`/product/${id}`} className="details">
        <h2 className="name">{name}</h2>
        {/* <p>{slicedDesc}</p> */}
        <span>Price:</span>
        <span style={{ color: "grey" }}>{priceType}</span>
        <p className="price">₹{fixedPrice}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
