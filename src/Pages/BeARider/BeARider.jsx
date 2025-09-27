import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import AxiosHook from "../../Hooks/AxiosHook";

const BeARider = () => {
  const { user } = useContext(AuthContext);
  const serviceCenters = useLoaderData(); // loaded from route
  const [districts, setDistricts] = useState([]);
  const axiosSecure = AxiosHook();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const selectedRegion = watch("region");

  useEffect(() => {
    if (selectedRegion) {
      const filteredDistricts = serviceCenters
        .filter((center) => center.region === selectedRegion)
        ?.map((center) => center.district);
      setDistricts([...new Set(filteredDistricts)]); // remove duplicates
    } else {
      setDistricts([]);
    }
  }, [selectedRegion, serviceCenters]);

  const onSubmit = (data) => {
    const riderData = {
      ...data,
      name: user?.displayName,
      email: user?.email,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    console.log(riderData);
    axiosSecure.post("/riders", riderData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Your rider request is under review.",
        });
      }
    });
    // Submit to your backend here
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-accent mt-8 md:mt-12 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-secondary">Become a Rider</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <input
          className="input input-bordered w-full"
          defaultValue={user?.displayName}
          readOnly
        />

        <input
          className="input input-bordered w-full"
          defaultValue={user?.email}
          readOnly
        />

        <input
          className="input input-bordered w-full"
          placeholder="Your Age"
          type="number"
          {...register("age", { required: true, min: 18 })}
        />
        {errors.age && (
          <p className="text-red-500 text-sm">Minimum age is 18</p>
        )}

        <select
          className="select select-bordered w-full"
          {...register("region", { required: true })}
        >
          <option value="">Select Region</option>
          {[...new Set(serviceCenters.map((s) => s.region))]?.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>

        <select
          className="select select-bordered w-full"
          {...register("district", { required: true })}
          disabled={!selectedRegion}
        >
          <option value="">Select District</option>
          {districts?.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>

        <input
          className="input input-bordered w-full"
          placeholder="Phone Number"
          type="tel"
          {...register("phone", { required: true })}
        />

        <input
          className="input input-bordered w-full"
          placeholder="National ID Number"
          type="text"
          {...register("nid", { required: true })}
        />

        <input
          className="input input-bordered w-full"
          placeholder="Bike Brand (e.g. Honda)"
          type="text"
          {...register("bikeBrand", { required: true })}
        />

        <input
          className="input input-bordered w-full"
          placeholder="Bike Registration Number"
          type="text"
          {...register("bikeRegNo", { required: true })}
        />

        <button className="btn btn-primary btn-outline mt-4" type="submit">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default BeARider;
