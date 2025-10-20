import { useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import AxiosHook from "../../../Hooks/AxiosHook";

const TrackParcel = () => {
  const { trackingId: paramId } = useParams(); // get from URL
  const [trackingId, setTrackingId] = useState(paramId || "");
  const [trackingData, setTrackingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const axiosSecure = AxiosHook();

  // Fetch tracking updates
  const fetchTracking = async (id) => {
    try {
      setLoading(true);
      const res = await axiosSecure.get(`/tracking/${id}`);
      setTrackingData(res.data || []);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Tracking ID not found or server error.", "error");
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    fetchTracking(trackingId.trim());
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Track Parcel</h1>

      <form onSubmit={handleSearch} className="mb-6 flex gap-4">
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter Tracking ID"
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <p>Loading tracking updates...</p>}

      {!loading && trackingData.length > 0 && (
        <div className="space-y-4">
          {trackingData.map((update, index) => (
            <div
              key={index}
              className="border rounded p-4 shadow hover:shadow-md transition"
            >
              <p>
                <strong>Status:</strong>{" "}
                <span className="text-blue-600">{update.status}</span>
              </p>
              <p>
                <strong>Message:</strong> {update.message}
              </p>
              <p>
                <strong>Updated By:</strong>{" "}
                {update.updated_by || "System/Admin"}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(update.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {!loading && searched && trackingData.length === 0 && (
        <p className="text-red-600 font-semibold">No tracking updates found.</p>
      )}
    </div>
  );
};

export default TrackParcel;
