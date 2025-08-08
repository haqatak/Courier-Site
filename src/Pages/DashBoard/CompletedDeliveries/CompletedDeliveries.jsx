import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import AxiosHook from "../../../Hooks/AxiosHook";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";

const CompletedDeliveries = () => {
  const axiosSecure = AxiosHook();
  const { user } = useContext(AuthContext);

  const { data: deliveryData = {}, isLoading, refetch } = useQuery({
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
      Swal.fire("Success", "Cashout successful", "success");
      refetch();
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Cashout failed", "error");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Completed Deliveries</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : deliveries.length === 0 ? (
        <p className="text-gray-500">No completed deliveries yet.</p>
      ) : (
        <>
          <div className="mb-4 text-lg font-semibold text-green-700">
            Total Earnings: ${totalEarning.toFixed(2)}
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-2">Token ID</th>
                  <th className="border px-2 py-2">Pickup Center</th>
                  <th className="border px-2 py-2">Delivery Center</th>
                  <th className="border px-2 py-2">Status</th>
                  <th className="border px-2 py-2">Fee</th>
                  <th className="border px-2 py-2">Earning</th>
                  <th className="border px-2 py-2">Delivered At</th>
                  <th className="border px-2 py-2">Cashout</th>
                </tr>
              </thead>
              <tbody>
                {deliveries?.map((d) => (
                  <tr key={d._id}>
                    <td className="border px-2 py-1">{d.token_id}</td>
                    <td className="border px-2 py-1">{d.sender_service_center}</td>
                    <td className="border px-2 py-1">{d.receiver_service_center}</td>
                    <td className="border px-2 py-1 capitalize">
                      {d.delivery_status.replace(/_/g, " ")}
                    </td>
                    <td className="border px-2 py-1">${d.cost}</td>
                    <td className="border px-2 py-1 text-green-600">${d.earning.toFixed(2)}</td>
                    <td className="border px-2 py-1">
                      {new Date(d.delivered_at).toLocaleDateString()} {" "}
                      {new Date(d.delivered_at).toLocaleTimeString()}
                    </td>
                    <td className="border px-2 py-1">
                      {d.cashout_status !== "cashed_out" ? (
                        <button
                          onClick={() => handleCashout(d._id)}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Cash Out
                        </button>
                      ) : (
                        <span className="text-gray-500">Cashed Out</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default CompletedDeliveries;
