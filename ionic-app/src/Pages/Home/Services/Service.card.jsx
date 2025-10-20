import React from "react";
import { motion } from "framer-motion";

const ServiceCard = ({ service, index }) => {
  const { icon: Icon, title, description } = service;

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, delay: index * 0.2 },
    },
  };

  return (
    <motion.div
      className="bg-accent rounded-2xl py-6 px-6"
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardVariants}
    >
      <div className="text-4xl mb-4 flex justify-center text-primary">
        <Icon />
      </div>
      <h3 className="text-xl text-secondary font-bold mb-2">{title}</h3>
      <p className="text-primary/80 font-semibold">{description}</p>
    </motion.div>
  );
};

export default ServiceCard;
