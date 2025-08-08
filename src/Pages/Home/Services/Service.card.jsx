import React from "react";

const ServiceCard = ({ service }) => {
  const { icon: Icon, title, description } = service;
  return (
    <div className="bg-white shadow-md p-5 rounded-2xl text-center hover:shadow-lg transition text-secondary hover:bg-primary">
      <div className="text-4xl mb-4 flex justify-center text-secondary">
        <Icon />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;
