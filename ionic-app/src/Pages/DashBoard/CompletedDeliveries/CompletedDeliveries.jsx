import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import AxiosHook from "../../../Hooks/AxiosHook";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import Loading2 from "../../../Shared/Loading/Loading2";

const rowAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CompletedDeliveries = () => {
  const axiosSecure = AxiosHook();
  const { user } = useContext(AuthContext);

  const {
    data: deliveryData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["completedDeliveries", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/completed-deliveries?email=${user.email}`
      );
      return res.data;
    },
  });

  const deliveries = deliveryData.deliveries || [];
  const totalEarning = deliveryData.totalEarning || 0;

  const handleCashout = async (parcelId) => {
    try {
      await axiosSecure.patch(`/parcels/${parcelId}/cashout`);
      Swal.fire("✅ Success", "Cashout successful", "success");
      refetch();
    } catch (error) {
      Swal.fire(
        "❌ Error",
        error.response?.data?.message || "Cashout failed",
        "error"
      );
    }
  };

  if (isLoading) return <Loading2 />;

  if (deliveries.length === 0)
    return (
      <p className="text-info text-center mt-6">No completed deliveries yet.</p>
    );

  return (
    <div className="px-4 py-6 w-full md:p-12 mx-auto">
      <h1 className="text-4xl font-bold text-secondary text-center mb-6">
        Completed Deliveries
      </h1>

      {/* Total Earnings */}
      <div className="mb-6 text-lg font-semibold text-secondary text-center">
        Total Earnings:{" "}
        <span className="text-green-500">${totalEarning.toFixed(2)}</span>
      </div>

      {/* Small Screen Cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {deliveries.map((d) => (
          <motion.div
            key={d._id}
            className="bg-accent rounded-lg shadow p-4 flex flex-col gap-2 text-primary"
            initial="hidden"
            animate="visible"
            variants={rowAnimation}
          >
            <p>
              <strong>Token ID:</strong> {d.token_id}
            </p>
            <p>
              <strong>Pickup:</strong> {d.sender_service_center}
            </p>
            <p>
              <strong>Delivery:</strong> {d.receiver_service_center}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold capitalize ${
                  d.delivery_status === "delivered"
                    ? "text-green-500"
                    : "text-secondary"
                }`}
              >
                {d.delivery_status.replace(/_/g, " ")}
              </span>
            </p>
            <p>
              <strong>Fee:</strong> ${d.cost}
            </p>
            <p>
              <strong>Earning:</strong>{" "}
              <span className="text-green-500">${d.earning.toFixed(2)}</span>
            </p>
            <p>
              <strong>Delivered At:</strong>{" "}
              {new Date(d.delivered_at).toLocaleString()}
            </p>
            <div className="mt-2">
              {d.cashout_status !== "cashed_out" ? (
                <button
                  onClick={() => handleCashout(d._id)}
                  className="bg-secondary text-neutral px-4 py-1 rounded hover:bg-secondary/90 transition"
                >
                  Cash Out
                </button>
              ) : (
                <span className="text-info">Cashed Out</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Medium & Large Screen Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-info rounded-lg text-sm">
          <thead className="bg-primary text-neutral">
            <tr>
              <th className="p-2 border border-info">Token ID</th>
              <th className="p-2 border border-info">Pickup Center</th>
              <th className="p-2 border border-info">Delivery Center</th>
              <th className="p-2 border border-info">Status</th>
              <th className="p-2 border border-info">Fee</th>
              <th className="p-2 border border-info">Earning</th>
              <th className="p-2 border border-info">Delivered At</th>
              <th className="p-2 border border-info">Cashout</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((d) => (
              <motion.tr
                key={d._id}
                className="bg-accent hover:bg-primary/20 transition-colors"
                initial="hidden"
                animate="visible"
                variants={rowAnimation}
              >
                <td className="border border-info px-2 py-1 font-medium text-primary">
                  {d.token_id}
                </td>
                <td className="border border-info px-2 py-1 text-info">
                  {d.sender_service_center}
                </td>
                <td className="border border-info px-2 py-1 text-info">
                  {d.receiver_service_center}
                </td>
                <td
                  className={`border border-info px-2 py-1 font-semibold capitalize ${
                    d.delivery_status === "delivered"
                      ? "text-green-500"
                      : "text-secondary"
                  }`}
                >
                  {d.delivery_status.replace(/_/g, " ")}
                </td>
                <td className="border border-info px-2 py-1 text-info">
                  ${d.cost}
                </td>
                <td className="border border-info px-2 py-1 text-green-500">
                  ${d.earning.toFixed(2)}
                </td>
                <td className="border border-info px-2 py-1 text-info">
                  {new Date(d.delivered_at).toLocaleString()}
                </td>
                <td className="border border-info px-2 py-1">
                  {d.cashout_status !== "cashed_out" ? (
                    <button
                      onClick={() => handleCashout(d._id)}
                      className="bg-secondary text-neutral px-3 py-1 rounded hover:bg-secondary/90 transition"
                    >
                      Cash Out
                    </button>
                  ) : (
                    <span className="text-info">Cashed Out</span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveries;
