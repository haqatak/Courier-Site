import React from "react";
import img from "../../../assets/location-merchant.png";
import { motion } from "framer-motion";

const BeMarchent = () => {
  return (
    <motion.div
      data-aos="zoom-out"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373d]
                 p-5 sm:p-8 md:p-12 lg:p-20 rounded-3xl"
    >
      <div className="flex flex-col-reverse lg:flex-row-reverse items-center gap-6 lg:gap-12">
        {/* Image */}
        <motion.img
          src={img}
          alt="Merchant"
          className="w-40 sm:w-56 md:w-72 lg:w-80 rounded-xl shadow-2xl"
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Text */}
        <div className="text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#caeb66]">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-4 sm:py-6 text-sm sm:text-base md:text-lg text-[#11ffff] max-w-2xl mx-auto lg:mx-0">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default BeMarchent;
