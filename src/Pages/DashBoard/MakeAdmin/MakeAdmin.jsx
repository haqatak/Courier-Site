import React, { useState, useEffect } from "react";
import AxiosHook from "../../../Hooks/AxiosHook";
import Swal from "sweetalert2";
import { FaSearch, FaUserShield } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const MakeAdmin = () => {
  const [query, setQuery] = useState("");
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosSecure = AxiosHook();

  // 🔍 Fetch matching users
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
      setQuery((prev) => prev + " "); // force refresh
    } catch {
      Swal.fire("Error", "Failed to promote user", "error");
    }
  };

  const handleRemoveAdmin = async (id) => {
    try {
      await axiosSecure.patch(`/users/${id}/demote`);
      Swal.fire("Success", "Admin role removed", "success");
      setQuery((prev) => prev + " ");
    } catch {
      Swal.fire("Error", "Failed to remove admin role", "error");
    }
  };

  return (
    <div className="w-full  mx-auto p-4 md:p-8 lg:p-12">
      {/* Header */}
      <motion.h1
        className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <FaUserShield className="text-secondary" />
        Manage Admin Access
      </motion.h1>

      {/* Search */}
      <motion.form
        onSubmit={(e) => e.preventDefault()}
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center gap-3 bg-accent rounded-lg px-3 py-2 shadow-md">
          <FaSearch className="text-primary text-lg" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by email..."
            className="w-full bg-transparent outline-none text-info placeholder-info/60"
          />
        </div>
      </motion.form>

      {/* Loading */}
      {loading && (
        <motion.p
          className="text-primary font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Searching...
        </motion.p>
      )}

      {/* Results */}
      <AnimatePresence>
        {!loading && matchedUsers.length > 0 && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {matchedUsers.map((user, i) => (
              <motion.div
                key={user._id}
                className="bg-accent border border-accent rounded-2xl p-4 shadow-md flex flex-col sm:flex-row sm:items-center justify-between"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: i * 0.05 }}
              >
                {/* User Info */}
                <div className="text-info space-y-1">
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
                        user.role === "admin"
                          ? "text-secondary font-semibold"
                          : "text-primary font-medium"
                      }`}
                    >
                      {user.role || "user"}
                    </span>
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-4 sm:mt-0 sm:ml-4">
                  {user.role !== "admin" ? (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="bg-primary text-neutral px-4 py-2 rounded-lg hover:opacity-90 transition"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRemoveAdmin(user._id)}
                      className="bg-secondary text-neutral px-4 py-2 rounded-lg hover:opacity-90 transition"
                    >
                      Remove Admin
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Users */}
      {!loading && query && matchedUsers.length === 0 && (
        <motion.p
          className="text-red-500 font-medium mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No users found.
        </motion.p>
      )}
    </div>
  );
};

export default MakeAdmin;
