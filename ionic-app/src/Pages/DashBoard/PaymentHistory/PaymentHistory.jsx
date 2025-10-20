import React, { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import AxiosHook from "../../../Hooks/AxiosHook";
import { useQuery } from "@tanstack/react-query";
import PaymentHistoryTable from "./PaymentHistoryTable";
import Loading2 from "../../../Shared/Loading/Loading2";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = AxiosHook();

  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // ensures query runs only if email exists
  });

  if (isPending) {
    return <Loading2 />; // ✅ show Lottie loading instead of spinner
  }

  return (
    <div className="px-3 md:px-10 my-8 md:my-12">
      <h1 className="text-4xl font-bold text-secondary text-center mb-6">
        Payment History
      </h1>
      <PaymentHistoryTable payments={payments} />
    </div>
  );
};

export default PaymentHistory;
