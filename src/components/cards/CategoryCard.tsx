import { Fragment } from "react";
import { Link } from "react-router-dom";

type props =  {
    url : string;
    catIMG: string;
    catName: string;
}

const CategoryCard = ({url, catIMG, catName}: props) => {
  return (
    <Fragment>
      <Link to={url}>
        <div className="containerCat">
          <img className="catIMG" src={catIMG} alt="cat1" />
          <h2 className="catName">{catName}</h2>
        </div>
      </Link>
    </Fragment>
  );
};

export default CategoryCard;
