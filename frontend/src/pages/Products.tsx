import { useGetAllProductsQuery } from "../RTK/ProductApi";
import ProductCard from "../components/cards/ProductCard";
import Loader from "../components/Loader";

const Products = () => {
  const { data, error, isLoading } = useGetAllProductsQuery({});

  interface Product {
    _id: string;
    name: string;
    description: string;
    images: { url: string }[];
    rating: number;
    price: number;
    stock: number;
    // reviews: ReviewType[]; // Uncomment if you have a ReviewType defined
  }

  return (
    <div>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : error ? (
        <div className="loading">
          <h1 style={{ fontSize: "3vmax", color: "gray" }}>{String(error)}</h1>
        </div>
      ) : (
        <div>
          <div className="containerProduct">
            {data.products.length === 0 ? (
              <div className="loading">
                <h1 style={{ fontSize: "3vmax", color: "gray" }}>
                  No products found.
                </h1>
              </div>
            ) : (
              data.products.map((pro: Product) => (
                <ProductCard
                  key={pro._id}
                  id={pro._id}
                  name={pro.name}
                  desc={pro.description}
                  img={pro.images[0].url}
                  // rating={pro.rating}
                  fixedPrice={pro.price}
                  stock={pro.stock}
                  //   reviews={pro.reviews}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
