import React from "react";
import { motion } from "framer-motion";

const tableVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const PaymentHistoryTable = ({ payments, loading }) => {
  return (
    <motion.div
      className="overflow-x-auto"
      initial="hidden"
      animate="show"
      variants={tableVariants}
    >
      <table className="table w-full shadow-md rounded-xl overflow-hidden">
        <thead className="bg-primary text-neutral font-semibold text-lg">
          <tr>
            <th>Transaction ID</th>
            <th>Parcel ID</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Paid At</th>
          </tr>
        </thead>

        <motion.tbody
          initial="hidden"
          animate="show"
          variants={{
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-6">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </td>
            </tr>
          ) : payments.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-6 text-info font-medium">
                No payment history found.
              </td>
            </tr>
          ) : (
            payments.map((payment) => (
              <motion.tr
                key={payment.transactionId}
                variants={tableVariants}
                className="bg-accent hover:bg-primary/30 transition-colors duration-300 text-center"
              >
                <td className="px-4 py-2 break-all">{payment.transactionId}</td>
                <td className="px-4 py-2">{payment.parcelId}</td>
                <td className="px-4 py-2 font-semibold text-secondary">
                  ${payment.amount.toFixed(2)}
                </td>
                <td className="px-4 py-2">{payment.paymentMethod}</td>
                <td className="px-4 py-2">
                  <span
                    className={`badge px-3 py-2 rounded-lg text-sm ${
                      payment.status === "paid"
                        ? "bg-primary text-neutral"
                        : "bg-secondary text-neutral"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {new Date(payment.paid_At).toLocaleString()}
                </td>
              </motion.tr>
            ))
          )}
        </motion.tbody>
      </table>
    </motion.div>
  );
};

export default PaymentHistoryTable;
