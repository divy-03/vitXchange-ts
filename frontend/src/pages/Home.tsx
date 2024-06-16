import CategoryCard from "../components/cards/CategoryCard";
import Caraousel from "../components/carsousel/Caraousel";

const Home = () => {
  return (
    <div className="homeContainer">
      <Caraousel />
      <h2>Categories:-</h2>
      <div className="containerBan" id="category">
        <CategoryCard
          catName="Hand Bag"
          catIMG="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e52d6553668075697e_hand%20bag-min.png"
          url="/handbag"
        />
        <CategoryCard
          catName="Furniture"
          catIMG="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e570738029a725e686_Furniture-min.png"
          url="/furniture"
        />
        <CategoryCard
          catName="Books"
          catIMG="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e460afc22b7ea53520_books-min.png"
          url="/books"
        />
        <CategoryCard
          catName="Tech"
          catIMG="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e754ac2e32897cb53b_tech-min.png"
          url="/tech"
        />
        <CategoryCard
          catName="Sneakers"
          catIMG="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e64b769118272f244f_sneakers-min.png"
          url="/sneakers"
        />
        <CategoryCard
          catName="Travel"
          catIMG="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e71eb4ad6d07e7568f_travel-min.png"
          url="/travel"
        />
      </div>
    </div>
  );
};

export default Home;
