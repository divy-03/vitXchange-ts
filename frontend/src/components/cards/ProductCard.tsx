import { Link } from "react-router-dom";
// import ReactStars from "react-rating-stars-component";

type ProductsProps = {
  id: string;
  img: string;
  name: string;
  desc: string;
  fixedPrice: number;
  // rating: number;
  stock: number;
  //   handler: (cartItem: CartItem) => string | undefined;
};

const ProductCard = ({
  id,
  img,
  name,
  desc,
  // rating,
  fixedPrice,
}: ProductsProps) => {
  // const options = {
  //   edit: false,
  //   size: window.innerWidth < 700 ? 15 : 20,
  //   color: "rgb(20, 20, 20, 0.1)",
  //   activColor: "yellow",
  //   value: rating,
  //   isHalf: true,
  // };

  let slicedDesc = desc;
  if (desc && desc.length > 25) {
    slicedDesc = desc.slice(0, 25) + "...";
  }

  let slicedName = name;
  if (name && name.length > 15) {
    slicedName = name.slice(0, 15) + "...";
  }

  return (
    <Link to={`/product/${id}`} className="proCard">
      <img src={img} alt="HeroImg" />
      <div>
        <h2>{slicedName}</h2>
        <p>{slicedDesc}</p>
        {/* <div>
          <ReactStars {...options} />
        </div> */}
      </div>
      <p>₹{fixedPrice}/-</p>
    </Link>
  );
};

export default ProductCard;
