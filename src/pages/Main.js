import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Main() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const imgs = [
    "/imgs/cleaner.jpeg",
    "/imgs/fan.jpeg",
    "/imgs/massage.jpeg",
  ];

  return (
    <>
    <h3 className="maintext"> ⭐️ shop 대표 상품 ⭐️ </h3>
    <Slider {...settings} className="slider">
        {imgs.map((val) => {
            return(
                <div>
                    <img src={val} width="300px"/>
                </div>
            )
        })}
    </Slider>
    </>
  );
}

export default Main;