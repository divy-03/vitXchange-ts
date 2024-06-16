import { useEffect, useState } from "react";
import data from "../../assets/carouselData.json";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const slides = data.slides;

const Caraousel = () => {
  const [slide, setSlide] = useState(0);

  const prevSlide = () => {
    setSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const nextSlide = () => {
    setSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  useEffect(() => {
    const slideTimer = setTimeout(() => {
      setSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => clearTimeout(slideTimer);
  }, [slide]);
  return (
    <div className="carouselContainer">
      <button onClick={prevSlide} className="slideBtn backBtn">
        <IoIosArrowBack />
      </button>
      {slides.map((item, idx) => (
        <Link to={item.url} key={idx} target="_blank" rel="noreferrer">
          <img
            src={item.src}
            alt={item.alt}
            className={slide === idx ? "slide" : "slide slide-hidden"}
            style={{
              opacity: slide === idx ? 1 : 0,
              transition: "all 1s ease",
            }}
          />
        </Link>
      ))}
      <button onClick={nextSlide} className="slideBtn forBtn">
        <IoIosArrowForward />
      </button>
      <span className="indicators">
        {slides.map((_, idx) => {
          return (
            <button
              key={idx}
              className={
                slide === idx ? "indicator" : "indicator indicator-inactive"
              }
              onClick={() => {
                setSlide(idx);
              }}
            ></button>
          );
        })}
      </span>
    </div>
  );
};

export default Caraousel;
