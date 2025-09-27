import React, { useState } from "react";
import BangladeshMap from "./BangledeshMap";
import { useLoaderData } from "react-router";
import MapSearch from "./MapSearch";

const Coverage = () => {
  const mapData = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [activePosition, setActivePosition] = useState(null);
  const [activeDistrict, setActiveDistrict] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.trim().toLowerCase();
    const match = mapData.find((d) => d.district.toLowerCase().includes(term));
    if (match) {
      setActivePosition([match.latitude, match.longitude]);
      setActiveDistrict(match.district);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 md:px-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-2">
        We Are Available in 64 Districts
      </h1>
      <MapSearch
        searchTerm={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSubmit={handleSearch}
      />

      <div className="rounded-xl overflow-hidden shadow-lg">
        <BangladeshMap
          mapData={mapData}
          activeDistrict={activeDistrict}
          activePosition={activePosition}
        />
      </div>
    </div>
  );
};

export default Coverage;
