import React from "react";
import Marquee from "react-fast-marquee";

// Import logos
import logo1 from "../../../assets/brands/amazon.png";
import logo2 from "../../../assets/brands/amazon_vector.png";
import logo3 from "../../../assets/brands/casio.png";
import logo4 from "../../../assets/brands/moonstar.png";
import logo5 from "../../../assets/brands/randstad.png";
import logo6 from "../../../assets/brands/start-people 1.png";
import logo7 from "../../../assets/brands/start.png";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const ClientLogoSlider = () => {
  return (
    <div data-aos="zoom-out-down" className="py-10 bg-base-200 px-4 md:px-8 lg:px-16 m-3 md:my-12 text-secondary">
      <h2 className="text-xl md:text-3xl font-bold text-center mb-6">We've helped thousands of sales teams
      </h2>

      <Marquee speed={50} gradient={false} pauseOnHover={true}>
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center mx-12 md:mx-20"
          >
            <img
              src={logo}
              alt={`Client ${index + 1}`}
              className="h-7 w-auto object-contain"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ClientLogoSlider;
