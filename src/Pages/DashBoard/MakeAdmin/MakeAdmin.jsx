import React, { useState, useEffect } from "react";
import AxiosHook from "../../../Hooks/AxiosHook";
import Swal from "sweetalert2";
import { FaSearch, FaUserShield } from "react-icons/fa";

const MakeAdmin = () => {
  const [query, setQuery] = useState("");
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosSecure = AxiosHook();

  // 🔍 Fetch matching users on input
  useEffect(() => {
    const fetchUsers = async () => {
      if (!query.trim()) {
        setMatchedUsers([]);
        return;
      }

      try {
        setLoading(true);
        const res = await axiosSecure.get(`/users/search?email=${query}`);
        if (Array.isArray(res.data)) {
          setMatchedUsers(res.data);
        } else {
          setMatchedUsers([res.data]);
        }
      } catch (err) {
        console.log(err);
        setMatchedUsers([]);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchUsers, 500);
    return () => clearTimeout(delayDebounce);
  }, [query, axiosSecure]);

const handleMakeAdmin = async (id) => {
  try {
    await axiosSecure.patch(`/users/${id}/promote`);
    Swal.fire("Success", "User promoted to admin", "success");

    // manually re-fetch the matched users
    setQuery((prev) => prev + " "); // trigger useEffect
  } catch {
    Swal.fire("Error", "Failed to promote user", "error");
  }
};

const handleRemoveAdmin = async (id) => {
  try {
    await axiosSecure.patch(`/users/${id}/demote`);
    Swal.fire("Success", "Admin role removed", "success");

    // manually re-fetch the matched users
    setQuery((prev) => prev + " ");
  } catch {
    Swal.fire("Error", "Failed to remove admin role", "error");
  }
};



  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaUserShield className="text-blue-600" />
        Manage Admin Access
      </h1>

      <form onSubmit={(e) => e.preventDefault()} className="mb-6">
        <div className="flex items-center gap-3">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by email..."
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </form>

      {loading && <p className="text-gray-600">Searching...</p>}

      {!loading && matchedUsers.length > 0 && (
        <div className="space-y-4">
          {matchedUsers.map((user) => (
            <div
              key={user._id}
              className="border rounded-lg p-4 shadow flex flex-col sm:flex-row sm:items-center justify-between"
            >
              <div>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(user.created_at).toLocaleString()}
                </p>
                <p>
                  <strong>Role:</strong>{" "}
                  <span
                    className={`${
                      user.role === "admin" ? "text-green-600" : "text-gray-600"
                    } font-semibold`}
                  >
                    {user.role || "user"}
                  </span>
                </p>
              </div>

              <div className="mt-4 sm:mt-0 sm:ml-4 space-x-2">
                {user.role !== "admin" ? (
                  <button
                    onClick={() => handleMakeAdmin(user._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Make Admin
                  </button>
                ) : (
                  <button
                    onClick={() => handleRemoveAdmin(user._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    Remove Admin
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && query && matchedUsers.length === 0 && (
        <p className="text-red-500 mt-4">No users found.</p>
      )}
    </div>
  );
};

export default MakeAdmin;
