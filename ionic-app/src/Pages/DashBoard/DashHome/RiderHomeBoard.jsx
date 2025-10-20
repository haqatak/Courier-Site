import React from "react";
import {
  FaWallet,
  FaMotorcycle,
  FaHistory,
  FaCheckCircle,
} from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";
import { motion } from "framer-motion";

const RiderHomeBoard = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">
      {/* Hero / Motivation Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-primary to-secondary text-neutral rounded-2xl shadow-lg p-10 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Welcome, Rider 🚴‍♂️</h1>
        <p className="text-lg max-w-2xl mx-auto">
          You’re not just delivering parcels—you’re delivering trust. Stay
          motivated, stay honest, and let’s grow together. The harder you work,
          the more you earn.
        </p>
      </motion.section>

      {/* Payment & Work Policy */}
      <section>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-secondary mb-6 text-center"
        >
          💸 Payment & Working Policy
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PolicyCard
            icon={<FaWallet className="text-3xl text-primary" />}
            title="Transparent Earnings"
            desc="See exactly how much you will earn for each delivery before accepting."
            delay={0.3}
          />
          <PolicyCard
            icon={<FiTrendingUp className="text-3xl text-secondary" />}
            title="Weekly Payouts"
            desc="Get your income on time with our fair weekly payout system."
            delay={0.4}
          />
          <PolicyCard
            icon={<FaMotorcycle className="text-3xl text-info" />}
            title="Flexible Work"
            desc="Pick parcels based on your choice. Work when you want, rest when you need."
            delay={0.5}
          />
        </div>
      </section>

      {/* Rules Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-secondary mb-6 text-center">
          📜 Rider Rules & Responsibilities
        </h2>
        <ul className="space-y-4 bg-accent rounded-xl p-6 shadow-md">
          <RuleItem text="Be honest and reliable in every delivery." />
          <RuleItem text="Work hard and stay motivated—your income grows with your effort." />
          <RuleItem text="You can choose to pick up or skip a parcel request." />
          <RuleItem text="Check payment before accepting—earnings are always transparent." />
          <RuleItem text="Track all your income history easily from your dashboard." />
        </ul>
      </motion.section>

      {/* Quick Access / Shortcuts */}
      <section>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-bold text-secondary mb-6 text-center"
        >
          ⚡ Quick Actions
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <ActionCard
            icon={<FaMotorcycle />}
            title="Available Parcels"
            desc="See parcels waiting for pickup."
            delay={0.6}
          />
          <ActionCard
            icon={<FaCheckCircle />}
            title="Completed Deliveries"
            desc="Review your successful deliveries."
            delay={0.7}
          />
          <ActionCard
            icon={<FaWallet />}
            title="My Earnings"
            desc="Check your income and pending balances."
            delay={0.8}
          />
          <ActionCard
            icon={<FaHistory />}
            title="Income History"
            desc="View your full earning history anytime."
            delay={0.9}
          />
        </div>
      </section>
    </div>
  );
};

// Policy Card with animation
const PolicyCard = ({ icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="bg-accent rounded-xl shadow-md p-6 text-center hover:shadow-xl transition"
  >
    <div className="flex justify-center mb-3">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-sm text-primary">{desc}</p>
  </motion.div>
);

// Rule Item
const RuleItem = ({ text }) => (
  <li className="flex items-start space-x-2">
    <span className="text-primary mt-1">✔</span>
    <p>{text}</p>
  </li>
);

// Action Card with animation
const ActionCard = ({ icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ scale: 1.05 }}
    className="bg-accent rounded-xl shadow-md p-5 text-center cursor-pointer"
  >
    <div className="text-3xl text-secondary mb-2 flex justify-center">
      {icon}
    </div>
    <h4 className="font-semibold">{title}</h4>
    <p className="text-sm text-primary">{desc}</p>
  </motion.div>
);

export default RiderHomeBoard;
