import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question: "How does this posture corrector work?",
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. It helps strengthen muscles and improves overall posture effortlessly.",
  },
  {
    question: "Is it suitable for all ages and body types?",
    answer:
      "Yes! This product is designed to fit most body types and is suitable for teenagers, adults, and seniors. Adjustable straps ensure comfort and proper alignment.",
  },
  {
    question: "Does it really help with back pain and posture improvement?",
    answer:
      "Absolutely. Regular use can reduce back pain, correct slouching, and improve spinal alignment over time.",
  },
  {
    question: "Does it have smart features like vibration alerts?",
    answer:
      "Yes! Some models come with smart vibration alerts to remind you to maintain proper posture throughout the day.",
  },
  {
    question: "How will I be notified when the product is back in stock?",
    answer:
      "You will receive an email notification if you subscribe for restock alerts on the product page.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="m-3 md:my-12 max-w-5xl mx-auto">
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-center mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Frequently Asked Questions <span className="text-secondary">(FAQ)</span>
      </motion.h2>

      <motion.p
        className="text-center md:w-2/3 mx-auto text-primary mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Enhance posture, mobility, and well-being effortlessly. Achieve proper alignment, reduce pain, and strengthen your body with ease!
      </motion.p>

      <div className="flex flex-col gap-4">
        {faqData.map((item, index) => (
          <motion.div
            key={index}
            className={`border rounded-2xl overflow-hidden shadow-lg ${
              activeIndex === index ? "bg-primary/10 border-primary" : "bg-base-100 border-base-300"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <motion.button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-6 py-4 flex justify-between items-center font-bold text-lg md:text-xl text-secondary"
              whileTap={{ scale: 0.97 }}
            >
              {item.question}
              <motion.span
                className={`transform transition-transform duration-300`}
                animate={{ rotate: activeIndex === index ? 45 : 0 }}
              >
                +
              </motion.span>
            </motion.button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="px-6 py-4 text-primary text-sm md:text-base font-medium"
                >
                  {item.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
