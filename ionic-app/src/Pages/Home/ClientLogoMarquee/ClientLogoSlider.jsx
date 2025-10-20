import React from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

// Import logos
import logo1 from "../../../assets/brands/amazon.png";
import logo2 from "../../../assets/brands/amazon_vector.png";
import logo3 from "../../../assets/brands/casio.png";
import logo4 from "../../../assets/brands/moonstar.png";
import logo5 from "../../../assets/brands/randstad.png";
import logo6 from "../../../assets/brands/start-people 1.png";
import logo7 from "../../../assets/brands/start.png";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

// Motion variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const ClientLogoSlider = () => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full"
    >
      {/* Heading */}
      <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-center mb-6">
        We've helped thousands of{" "}
        <span className="text-secondary">sales teams</span>
      </h2>

      {/* Slider Section */}
      <div
        className="py-6 px-2 md:px-8 lg:px-12 rounded-2xl bg-[#f1f1f1] shadow-md"
      >
        <Marquee speed={40} gradient={false} pauseOnHover={true}>
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center mx-6 sm:mx-10 md:mx-14"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <img
                src={logo}
                alt={`Client ${index + 1}`}
                className="h-6 sm:h-8 md:h-10 w-auto object-contain"
              />
            </motion.div>
          ))}
        </Marquee>
      </div>
    </motion.div>
  );
};

export default ClientLogoSlider;
