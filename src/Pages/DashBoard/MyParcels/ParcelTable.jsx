import React from "react";
import { FaEye, FaTrashAlt, FaMoneyBillAlt } from "react-icons/fa";

const ParcelTable = ({ parcels, onView, onPay, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead className="bg-base-200 text-base font-semibold">
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
        <tbody>
          {parcels.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-6">
                No parcels found.
              </td>
            </tr>
          ) : (
            parcels?.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td className="capitalize">{parcel.type}</td>
                <td className="max-w-[180px] truncate">{parcel.title}</td>
                <td>{new Date(parcel.creation_date).toLocaleString()}</td>
                <td>৳{parcel.cost}</td>
                <td>
                  <span
                    className={`badge ${
                      parcel.payment_status === "paid"
                        ? "badge-success"
                        : "badge-error"
                    } badge-md text-white`}
                  >
                    {parcel.payment_status}
                  </span>
                </td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-info text-white tooltip"
                    data-tip="View Details"
                    onClick={() => onView(parcel)}
                  >
                    <FaEye />
                  </button>
                  {parcel.payment_status !== "paid" && (
                    <button
                      className="btn btn-sm btn-success text-white tooltip"
                      data-tip="Pay Now"
                      onClick={() => onPay(parcel)}
                    >
                      <FaMoneyBillAlt />
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-error text-white tooltip"
                    data-tip="Delete"
                    onClick={() => onDelete(parcel)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ParcelTable;
