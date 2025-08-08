import React from "react";

const PaymentHistoryTable = ({ payments }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
            <th className="border border-gray-300 px-4 py-2">Parcel ID</th>
            <th className="border border-gray-300 px-4 py-2">Amount (USD)</th>
            <th className="border border-gray-300 px-4 py-2">Payment Method</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Paid At</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No payment history found.
              </td>
            </tr>
          )}
          {payments.map((payment) => (
            <tr key={payment.transactionId} className="text-center">
              <td className="border border-gray-300 px-4 py-2 break-all">
                {payment.transactionId}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {payment.parcelId}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                ${payment.amount.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {payment.paymentMethod}
              </td>
              <td className="border border-gray-300 px-4 py-2 capitalize">
                {payment.status}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(payment.paid_At).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistoryTable;
