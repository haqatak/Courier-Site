import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import ParmentForm from "./ParmentForm";

const Payment = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
  return (
    <Elements stripe={stripePromise}>
      <ParmentForm></ParmentForm>
    </Elements>
  );
};

export default Payment;
