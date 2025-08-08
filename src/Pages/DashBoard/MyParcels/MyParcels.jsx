import React, { use } from "react";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import AxiosHook from "../../../Hooks/AxiosHook";
import { useQuery } from "@tanstack/react-query";
import ParcelTable from "./ParcelTable";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = use(AuthContext);
  const axiosSecure = AxiosHook();
  const navigate = useNavigate();

  const {
    data: parcels = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleView = (parcel) => {
    console.log("View:", parcel);
  };

  const handlePay = (parcel) => {
    console.log("Pay:", parcel);
    navigate(`/dashboard/payment/${parcel._id}`);
  };

  const handleDelete = (parcel) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete parcel "${parcel.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/parcels/${parcel._id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "The parcel has been deleted.", "success");
            refetch(); // 👈 refresh data
          } else {
            Swal.fire("Error", "Failed to delete the parcel.", "error");
          }
        } catch (error) {
          console.error("Delete error:", error);
          Swal.fire("Error", "An error occurred while deleting.", "error");
        }
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Parcels</h2>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <ParcelTable
          parcels={parcels}
          onView={handleView}
          onPay={handlePay}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default MyParcels;
