import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../../../assets/banner/banner1.png";
import img2 from "../../../assets/banner/banner2.png";
import img3 from "../../../assets/banner/banner3.png";

const Banner = () => {
  return (
    <div
      data-aos="zoom-out"
      data-aos-duration="2000"
      className="m-3 md:my-12 shadow-xl shadow-primary/50 rounded-2xl overflow-hidden"
    >
      <Carousel
        autoPlay
        infiniteLoop
        transitionTime={1400}
        showThumbs={false}
        showStatus={false} // hides current slide count
        emulateTouch // allows swipe on mobile
      >
        <div>
          <img src={img1} alt="Banner 1" className="rounded-2xl" />
        </div>
        <div>
          <img src={img2} alt="Banner 2" className="rounded-2xl" />
        </div>
        <div>
          <img src={img3} alt="Banner 3" className="rounded-2xl" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
