import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { use, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AxiosHook from "../../../Hooks/AxiosHook";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";
import useTrackLogger from "../../../Hooks/useTrackLogger";

const ParmentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState();
  const { id } = useParams();
  const { user } = use(AuthContext);
  const axiosSecure = AxiosHook();
  const navigate = useNavigate();
  const { logTracking } = useTrackLogger();

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    },
  });

  if (isPending) {
    return "loading...";
  }
  console.log(parcelInfo);
  const amount = parcelInfo.cost;
  const amountInCents = amount * 100;
  console.log(amountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("payment method", paymentMethod);

      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        id,
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        setError("");
        if (result.paymentIntent.status === "succeeded") {
          // console.log("payment succeeded");
          // console.log(result);
          const paymentData = {
            parcelId: id,
            userEmail: user.email,
            amount,
            transactionId: result.paymentIntent.id,
            paymentMethod: "card",
          };
          const paymentRes = await axiosSecure.post("/payments", paymentData);
          if (paymentRes.data.insertedId) {
            Swal.fire({
              title: "Payment Successful!",
              html: `Your payment was successful.<br/><strong>Transaction ID:</strong><br/> ${result.paymentIntent.id}`,
              icon: "success",
              confirmButtonText: "Go to My Parcels",
            }).then(async () => {
              await logTracking({
                trackingId: parcelInfo.token_id,
                parcelId: parcelInfo._id,
                status: "submitted",
                message: `Payment completed by ${user.displayName}`,
                updated_by: user?.email || "system",
              });
              navigate("/dashboard/myParcel");
            });
          }
        }
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p-2 border rounded "></CardElement>{" "}
        <button
          type="submit"
          className="btn btn-primary text-black w-full"
          disabled={!stripe}
        >
          Pay ${amount}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default ParmentForm;
