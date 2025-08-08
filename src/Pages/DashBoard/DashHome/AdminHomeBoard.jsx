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
import { MdLocalShipping } from "react-icons/md";

// Create React Query client
const queryClient = new QueryClient();

// Custom hook to fetch status counts
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

// Define colors for statuses
const COLORS = ["#00C49F", "#0088FE", "#FFBB28", "#FF8042", "#8884d8", "#ff6666"];

// Capitalize status labels
const formatStatus = (status) =>
  status
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

function StatusPieChart({ data }) {
  return (
    <div className="p-4 bg-white shadow rounded w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">📊 Parcel Delivery Status Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ status }) => formatStatus(status)}
          >
            {data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}`, "Parcels"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function StatusList({ data }) {
  return (
    <div className="p-4 mt-6 bg-white shadow rounded w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <MdLocalShipping className="text-blue-600" />
        Delivery Status Breakdown
      </h2>
      <ul className="space-y-2">
        {data?.map(({ status, count }) => (
          <li key={status} className="text-gray-700">
            <strong className="capitalize">{formatStatus(status)}</strong>: {count}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Main Component
function StatusDashboard() {
  const { data, isPending, error } = useStatusCounts();

  if (isPending) return <p className="text-center mt-8">Loading status data...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">Error: {error.message}</p>;

  return (
    <div className="py-8 px-4">
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
