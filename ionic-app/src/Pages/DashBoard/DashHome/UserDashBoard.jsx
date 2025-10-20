import React from "react";
import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaMapMarkedAlt,
  FaHistory,
  FaCreditCard,
  FaTruck,
  FaQuestionCircle,
} from "react-icons/fa";

const UserDashBoard = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-primary to-secondary text-neutral rounded-2xl shadow-lg p-10 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Welcome, User 📦</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Send parcels to <span className="font-bold">all 64 districts</span> of
          Bangladesh with ease. Track coverage, manage payments, and check your
          history—all in one dashboard.
        </p>
      </motion.section>

      {/* Coverage Map */}
      <motion.section
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-secondary mb-6 text-center">
          🌍 Our Coverage
        </h2>
        <div className="bg-accent rounded-xl p-6 shadow-md text-center space-y-4">
          <FaMapMarkedAlt className="text-5xl text-primary mx-auto" />
          <p className="text-gray-700">
            We cover all 64 districts across Bangladesh. Search your own town
            below:
          </p>
          <input
            type="text"
            placeholder="Search your town..."
            className="input input-bordered w-full max-w-md mx-auto"
          />
          <p className="text-sm text-gray-500">
            (Interactive map will be shown here in future.)
          </p>
        </div>
      </motion.section>

      {/* Actions */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-bold text-secondary mb-6 text-center">
          ⚡ Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ActionCard
            icon={<FaBoxOpen />}
            title="Send Parcel"
            desc="Easily send parcels across Bangladesh."
          />
          <ActionCard
            icon={<FaHistory />}
            title="Parcel History"
            desc="View your past and ongoing deliveries."
          />
          <ActionCard
            icon={<FaCreditCard />}
            title="Payment List"
            desc="See pending & completed payments."
          />
        </div>
      </motion.section>

      {/* Payment Policy */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-accent rounded-xl p-6 shadow-md"
      >
        <h2 className="text-xl font-bold text-secondary mb-3">
          💳 Payment & Policy
        </h2>
        <p className="text-gray-700">
          You can select <b>Payment Later</b>, but your delivery process will
          begin only <b>after successful payment</b>.
          Pay with Credit Card, Mobile Banking, or Cash on Delivery.
        </p>
      </motion.section>

      {/* Extra Section - Support */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-secondary mb-6 text-center">
          🙋 Need Help?
        </h2>
        <div className="bg-accent rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
          <FaQuestionCircle className="text-4xl text-info mx-auto mb-3" />
          <p className="text-gray-700">
            Our support team is always ready to assist you. Contact us anytime
            if you need help with parcels or payments.
          </p>
        </div>
      </motion.section>
    </div>
  );
};

// Reusable Action Card
const ActionCard = ({ icon, title, desc }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.6 }}
    className="bg-accent rounded-xl shadow-md p-6 text-center cursor-pointer"
  >
    <div className="text-4xl text-secondary mb-3 flex justify-center">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{desc}</p>
  </motion.div>
);

export default UserDashBoard;
