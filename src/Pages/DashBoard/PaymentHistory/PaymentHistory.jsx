import React, { use } from "react";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import AxiosHook from "../../../Hooks/AxiosHook";
import { useQuery } from "@tanstack/react-query";
import PaymentHistoryTable from "./PaymentHistoryTable";

const PaymentHistory = () => {
  const { user } = use(AuthContext);
  const axiosSecure = AxiosHook();

  const { isPendign, data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isPendign) {
    return "...loading";
  }
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Payment History</h1>
      <PaymentHistoryTable payments={payments} />
    </div>
  );
};

export default PaymentHistory;
