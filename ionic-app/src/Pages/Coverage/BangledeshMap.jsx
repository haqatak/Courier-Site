// src/components/BangladeshMap.jsx
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// 🛫 Fly to position hook
const FlyToDistrict = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, 10);
  }, [position, map]);
  return null;
};

const bangladeshCoordinates = [23.685, 90.3563]; // Center of Bangladesh

const BangladeshMap = ({ mapData, activePosition }) => {
  console.log(mapData);
  return (
    <MapContainer
      center={bangladeshCoordinates}
      zoom={8}
      scrollWheelZoom={false}
      className="w-full h-[500px] z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 🔍 Fly to searched district */}
      {activePosition && <FlyToDistrict position={activePosition} />}

      {/* 📍 Render all district markers */}
   {Array.isArray(mapData) &&
  mapData.map((districts, index) => (
    <Marker
      key={index}
      position={[districts.latitude, districts.longitude]}
    >
      <Popup>
        <strong>{districts.district}</strong> <br />
        {districts.covered_area?.join(", ")}
      </Popup>
    </Marker>
))}

    </MapContainer>
  );
};

export default BangladeshMap;
