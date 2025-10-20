import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Banner from "../Banner/Banner";
import Services from "../Services/Services";
import ClientLogoSlider from "../ClientLogoMarquee/ClientLogoSlider";
import BenefitsSection from "../BenefitsSection/BenefitsSection";
import BeMarchent from "../BeMarchent/BeMarchent";
import FAQ from "../FAQ/FAQ";
import Loading from "../../../Shared/Loading/Loading";


const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake delay (2s), replace with API call logic if needed
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />; // ✅ Show loader first

  return (
    <div>
      {[
        <Banner key="banner" />,
        <Services key="services" />,
        <ClientLogoSlider key="slider" />,
        <BenefitsSection key="benefits" />,
        <BeMarchent key="merchant" />,
        <FAQ key="faq" />,
      ].map((Component, idx) => (
        <motion.div
          key={idx}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {Component}
        </motion.div>
      ))}
    </div>
  );
};

export default Home;
