import React from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import AxiosHook from "../../../Hooks/AxiosHook";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  MdLocalShipping,
  MdCheckCircle,
  MdPending,
  MdCancel,
  MdAccessTime,
} from "react-icons/md";
import { motion } from "framer-motion";
import Loading2 from "../../../Shared/Loading/Loading2";

// React Query client
const queryClient = new QueryClient();

// Fetch status counts
function useStatusCounts() {
  const axiosSecure = AxiosHook();
  return useQuery({
    queryKey: ["statusCounts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/delivery/status-counts");
      return res.data;
    },
  });
}

// Map status → icon
const statusIcons = {
  delivered: <MdCheckCircle className="text-secondary" />,
  pending: <MdPending className="text-secondary" />,
  cancelled: <MdCancel className="text-info" />,
  transit: <MdLocalShipping className="text-accent" />,
  delayed: <MdAccessTime className="text-secondary" />,
};

// Define theme colors from DaisyUI
// Define distinct colors for the pie slices
const COLORS = [
  "#4CAF50", // Green
  "#2196F3", // Blue
  "#FFC107", // Amber
  "#F44336", // Red
  "#9C27B0", // Purple
  "#00BCD4", // Cyan
  "#FF9800", // Orange
];

// Format status labels
const formatStatus = (status) =>
  status
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

// Pie chart
function StatusPieChart({ data }) {
  return (
    <motion.div
      className="p-6 bg-accent shadow-lg rounded-2xl w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-secondary">
        📊 Parcel Delivery Status
      </h2>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={110}
            label={({ status }) => formatStatus(status)}
          >
            {data?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]} // now using distinct colors
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}`, "Parcels"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

// Status list with animation
function StatusList({ data }) {
  return (
    <motion.div
      className="p-6 mt-8 bg-accent shadow-lg rounded-2xl w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-secondary">
        <MdLocalShipping className="text-secondary" />
        Delivery Status Breakdown
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {data?.map(({ status, count }) => (
          <motion.div
            key={status}
            className="flex items-center justify-between p-4 rounded-xl border bg-neutral border-base-300    hover:shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="flex items-center gap-3">
              {statusIcons[status] || (
                <MdLocalShipping className="text-secondary" />
              )}
              <span className="font-semibold text-primary">
                {formatStatus(status)}
              </span>
            </div>
            <span className="text-lg font-bold text-secondary">{count}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Main Dashboard
function StatusDashboard() {
  const { data, isPending, error } = useStatusCounts();

  if (isPending) return <Loading2></Loading2>;
  if (error)
    return (
      <p className="text-center mt-8 text-red-500">❌ Error: {error.message}</p>
    );

  return (
    <div className="py-10 px-4 flex flex-col items-center">
      <StatusPieChart data={data} />
      <StatusList data={data} />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusDashboard />
    </QueryClientProvider>
  );
}
