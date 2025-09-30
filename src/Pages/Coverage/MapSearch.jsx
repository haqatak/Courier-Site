import React from "react";

const MapSearch = ({ searchTerm, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-2 items-center mb-4">
      <input
        type="text"
        placeholder="Search district..."
        className="input input-bordered w-full max-w-xs"
        value={searchTerm}
        onChange={onChange}
      />
      <button className="btn btn-primary btn-outline
      ">Search</button>
    </form>
  );
};

export default MapSearch;
