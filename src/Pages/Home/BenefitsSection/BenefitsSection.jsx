import React from "react";
import benefit1 from "../../../assets/Benefits/Transit warehouse.png";
import benefit2 from "../../../assets/Benefits/Group 4.png";
import benefit3 from "../../../assets/Benefits/Group 4.png";

const benefits = [
  {
    image: benefit1,
    title: "Fast & Reliable Delivery",
    description:
      "We ensure your parcels reach their destination quickly and safely, every time.",
  },
  {
    image: benefit2,
    title: "Secure Payment Handling",
    description:
      "We offer secure and transparent payment options including cash-on-delivery.",
  },
  {
    image: benefit3,
    title: "24/7 Customer Support",
    description:
      "Our support team is always ready to assist you with any queries or issues.",
  },
];

const BenefitsSection = () => {
  return (
    <section data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000" className="bg-base-200 py-12 px-4 md:px-10 m-3 md:my-12 text-secondary">
      <h2 className="text-3xl font-bold text-center mb-10">Benefits of Choosing Us</h2>

      <div className="space-y-8">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="card lg:card-side bg-base-100 shadow-xl overflow-hidden "
          >
            {/* Left: Image */}
            <figure className="p-6 lg:w-1/4 flex justify-center items-center">
              <img
                src={benefit.image}
                alt={benefit.title}
                className="w-36 object-cover"
              />
            </figure>

            {/* Divider (only visible on large screens) */}
            <div className="hidden lg:flex items-center">
              <div className="border-r border-dashed h-40 border-gray-400 mx-4 my-4" />
            </div>

            {/* Right: Content - Center Vertically */}
            <div className="lg:w-2/3 flex items-center px-6 py-4">
              <div>
                <h3 className="card-title text-xl md:text-2xl">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
