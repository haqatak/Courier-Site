import React from "react";
import { FaEye, FaTrashAlt, FaMoneyBillAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const tableVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ParcelTable = ({ parcels, onView, onPay, onDelete }) => {
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
            <th>#</th>
            <th>Type</th>
            <th>Title</th>
            <th>Created At</th>
            <th>Cost</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <motion.tbody
          initial="hidden"
          animate="show"
          variants={{
            show: {
              transition: { staggerChildren: 0.08 },
            },
          }}
        >
          {parcels.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-6 text-info font-medium">
                No parcels found.
              </td>
            </tr>
          ) : (
            parcels?.map((parcel, index) => (
              <motion.tr
                key={parcel._id}
                variants={tableVariants}
                className="hover:bg-primary/40 bg-accent transition-colors duration-300"
              >
                <td>{index + 1}</td>
                <td className="capitalize">{parcel.type}</td>
                <td className="max-w-[180px] truncate">{parcel.title}</td>
                <td>{new Date(parcel.creation_date).toLocaleString()}</td>
                <td className="font-semibold text-secondary">৳{parcel.cost}</td>
                <td>
                  <span
                    className={`badge px-3 py-2 rounded-lg text-sm ${
                      parcel.payment_status === "paid"
                        ? "bg-primary text-neutral"
                        : "bg-secondary text-neutral"
                    }`}
                  >
                    {parcel.payment_status}
                  </span>
                </td>
                <td className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="btn btn-sm bg-secondary border-none text-neutral rounded-lg shadow-md"
                    onClick={() => onView(parcel)}
                  >
                    <FaEye />
                  </motion.button>

                  {parcel.payment_status !== "paid" && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="btn btn-sm bg-primary border-none text-neutral rounded-lg shadow-md"
                      onClick={() => onPay(parcel)}
                    >
                      <FaMoneyBillAlt />
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="btn btn-sm bg-accent border-none text-info rounded-lg shadow-md"
                    onClick={() => onDelete(parcel)}
                  >
                    <FaTrashAlt />
                  </motion.button>
                </td>
              </motion.tr>
            ))
          )}
        </motion.tbody>
      </table>
    </motion.div>
  );
};

export default ParcelTable;
