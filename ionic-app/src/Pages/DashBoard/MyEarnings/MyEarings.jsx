import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import AxiosHook from "../../../Hooks/AxiosHook";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import Loading2 from '../../../Shared/Loading/Loading2';

dayjs.extend(isToday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const MyEarnings = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = AxiosHook();

  const { data: earnings = [], isFetching } = useQuery({
    queryKey: ["rider-earnings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider-earnings?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isFetching) return <Loading2 />;

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
    .filter((e) => dayjs(e.date).isSameOrAfter(weekStart) && dayjs(e.date).isSameOrBefore(weekEnd))
    .reduce((sum, e) => sum + e.amount, 0);

  const thisMonthStart = dayjs().startOf("month");
  const thisYearStart = dayjs().startOf("year");

  const monthEarnings = earnings
    .filter((e) => dayjs(e.date).isSameOrAfter(thisMonthStart))
    .reduce((sum, e) => sum + e.amount, 0);

  const yearEarnings = earnings
    .filter((e) => dayjs(e.date).isSameOrAfter(thisYearStart))
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="w-full  mx-auto p-4 md:p-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-secondary text-center">My Earnings</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Total Earnings" value={`৳${totalEarnings}`} bgColor="bg-primary" />
        <StatCard title="Total Cashout" value={`৳${totalCashout}`} bgColor="bg-secondary" />
        <StatCard title="Pending Balance" value={`৳${totalPending}`} bgColor="bg-accent" textColor="text-primary" />
      </div>

      <h3 className="text-2xl font-semibold mt-10 mb-4 text-secondary">Earnings Analysis</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Today" value={`৳${todayEarnings}`} bgColor="bg-primary" />
        <StatCard title="This Week" value={`৳${weekEarnings}`} bgColor="bg-secondary" />
        <StatCard title="This Month" value={`৳${monthEarnings}`} bgColor="bg-accent" textColor="text-primary" />
        <StatCard title="This Year" value={`৳${yearEarnings}`} bgColor="bg-primary" />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, bgColor = "bg-primary", textColor = "text-neutral" }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
    className={`p-4 rounded-xl shadow-lg ${bgColor} ${textColor}`}
  >
    <h4 className="text-lg font-medium">{title}</h4>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </motion.div>
);

export default MyEarnings;
