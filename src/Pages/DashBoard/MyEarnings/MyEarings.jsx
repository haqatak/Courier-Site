import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import AxiosHook from "../../../Hooks/AxiosHook";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isToday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const MyEarnings = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = AxiosHook();

  const { data: earnings = [], isLoading } = useQuery({
    queryKey: ["rider-earnings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider-earnings?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0);
  const totalCashout = earnings
    .filter((e) => e.status === "cashed_out")
    .reduce((sum, e) => sum + e.amount, 0);
  const totalPending = earnings
    .filter((e) => e.status === "pending")
    .reduce((sum, e) => sum + e.amount, 0);

  const todayEarnings = earnings
    .filter((e) => dayjs(e.date).isToday())
    .reduce((sum, e) => sum + e.amount, 0);

  const weekStart = dayjs().startOf("week");
  const weekEnd = dayjs().endOf("week");

  const weekEarnings = earnings
    .filter((e) =>
      dayjs(e.date).isSameOrAfter(weekStart) &&
      dayjs(e.date).isSameOrBefore(weekEnd)
    )
    .reduce((sum, e) => sum + e.amount, 0);

  const thisMonthStart = dayjs().startOf("month");
  const thisYearStart = dayjs().startOf("year");

  const monthEarnings = earnings
    .filter((e) => dayjs(e.date).isSameOrAfter(thisMonthStart))
    .reduce((sum, e) => sum + e.amount, 0);

  const yearEarnings = earnings
    .filter((e) => dayjs(e.date).isSameOrAfter(thisYearStart))
    .reduce((sum, e) => sum + e.amount, 0);

  if (isLoading) return <p className="text-center py-10">Loading earnings...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Earnings</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Total Earnings" value={`৳${totalEarnings}`} color="bg-green-500" />
        <StatCard title="Total Cashout" value={`৳${totalCashout}`} color="bg-blue-500" />
        <StatCard title="Pending Balance" value={`৳${totalPending}`} color="bg-yellow-500" />
      </div>

      <h3 className="text-2xl font-semibold mt-10 mb-4">Earnings Analysis</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Today" value={`৳${todayEarnings}`} color="bg-indigo-500" />
        <StatCard title="This Week" value={`৳${weekEarnings}`} color="bg-purple-500" />
        <StatCard title="This Month" value={`৳${monthEarnings}`} color="bg-pink-500" />
        <StatCard title="This Year" value={`৳${yearEarnings}`} color="bg-red-500" />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className={`p-4 rounded-xl shadow-lg text-white ${color}`}>
    <h4 className="text-lg font-medium">{title}</h4>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </div>
);

export default MyEarnings;
