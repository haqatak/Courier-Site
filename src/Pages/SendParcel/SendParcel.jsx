import { use } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import AxiosHook from "../../Hooks/AxiosHook";
import useTrackLogger from "../../Hooks/useTrackLogger";

const generateTokenId = () => {
  const timestamp = Date.now().toString(36); // base36 timestamp
  const random = Math.random().toString(36).substring(2, 6); // random 4 characters
  return `P-${timestamp}-${random}`.toUpperCase(); // like P-KT1Q9H-Y8F3
};

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { user } = use(AuthContext);
  const axiosUse = AxiosHook();
  const navigate = useNavigate();
  const { logTracking } = useTrackLogger();
  console.log(logTracking);

  const serviceCenters = useLoaderData();
  const uniqueRegions = [...new Set(serviceCenters.map((w) => w.region))];

  const getServiceCenters = (region) => {
    return serviceCenters
      .filter((center) => center.region === region)
      ?.map((center) => center.district); // or center.city if needed
  };

  const parcelType = watch("type");
  const selectedSenderRegion = watch("sender_region");
  const selectedReceiverRegion = watch("receiver_region");
  const isInsideDhaka = (senderDistrict, receiverDistrict) => {
    return (
      senderDistrict?.toLowerCase() === "dhaka" &&
      receiverDistrict?.toLowerCase() === "dhaka"
    );
  };

  const onSubmit = async (data) => {
    const insideDhaka = isInsideDhaka(
      data.sender_service_center,
      data.receiver_service_center
    );

    let baseCost = 0;
    let breakdown = [];

    if (data.type === "document") {
      baseCost = insideDhaka ? 60 : 80;
      breakdown.push({ label: "Base Cost (Document)", value: baseCost });
    } else {
      const weight = Number(data.weight || 0);
      const threshold = 3;
      const perKgRate = 40;

      if (insideDhaka) {
        baseCost =
          weight <= threshold ? 110 : 110 + (weight - threshold) * perKgRate;
        breakdown.push({
          label: "Base Cost (Non-Document up to 3kg)",
          value: 110,
        });
        if (weight > threshold) {
          const extraWeight = weight - threshold;
          breakdown.push({
            label: `Extra Weight (${extraWeight} kg × ৳${perKgRate})`,
            value: extraWeight * perKgRate,
          });
        }
      } else {
        baseCost =
          weight <= threshold
            ? 150
            : 150 + (weight - threshold) * perKgRate + 40;
        breakdown.push({
          label: "Base Cost (Non-Document up to 3kg)",
          value: 150,
        });
        if (weight > threshold) {
          const extraWeight = weight - threshold;
          breakdown.push({
            label: `Extra Weight (${extraWeight} kg × ৳${perKgRate})`,
            value: extraWeight * perKgRate,
          });
          breakdown.push({ label: "Outside Dhaka Extra Fee", value: 40 });
        }
      }
    }

    const token_id = generateTokenId();

    const parcelData = {
      ...data,
      token_id,
      cost: baseCost,
      creation_date: new Date().toISOString(),
      user_email: user?.email || "Unknown User",
      payment_status: "unpaid",
      delivery_status: "pending",
    };

    const htmlBreakdown = `
      <div class="text-left space-y-1 text-base">
        <p><strong>From:</strong> ${data.sender_service_center}, ${
      data.sender_region
    }</p>
        <p><strong>To:</strong> ${data.receiver_service_center}, ${
      data.receiver_region
    }</p>
        <p><strong>Delivery Zone:</strong> ${
          insideDhaka ? "Inside Dhaka" : "Outside Dhaka"
        }</p>
        <hr />
        ${breakdown
          ?.map(
            (item) => `<p><strong>${item.label}:</strong> ৳${item.value}</p>`
          )
          .join("")}
        <hr />
        <p class="text-lg"><strong>Total Cost:</strong> ৳${baseCost}</p>
      </div>
    `;

    const result = await Swal.fire({
      title: "Confirm Your Parcel Details",
      html: htmlBreakdown,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Proceed",
      cancelButtonText: "Cancel Parcel",
      customClass: { popup: "bg-white rounded-xl p-4" },
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: "Payment",
        html: `
          <p>Total Amount: <strong>৳${baseCost}</strong></p>
          <button id="pay-btn" class="swal2-confirm swal2-styled bg-green-500 mt-4">Yes,Confirm</button>
          <button id="cancel-pay-btn" class="swal2-cancel swal2-styled bg-red-500 mt-2">Cancel</button>
        `,
        showConfirmButton: false,
        didOpen: () => {
          document.getElementById("pay-btn").onclick = async () => {
            Swal.close();
            try {
              const res = await axiosUse.post("/parcels", parcelData);
              const insertedId = res.data.insertedId;
              if (res.data.insertedId || res.data.acknowledged) {
                if (insertedId) {
                  await logTracking({
                    trackingId: token_id,
                    parcelId: insertedId,
                    status: "submitted",
                    message: `Parcel submitted by ${user.displayName}`,
                    updated_by: user?.email || "system",
                  });
                }
                toast.success("✅ Parcel successfully created!");
                navigate("/dashBoard/myParcel");
              } else {
                toast.error("Failed to save parcel");
              }
            } catch (err) {
              console.error("❌ Parcel saving failed:", err);
              toast.error(
                err?.response?.data?.message ||
                  err.message ||
                  "Server error while saving parcel"
              );
            }
          };
          document.getElementById("cancel-pay-btn").onclick = () => {
            Swal.close();
            toast.error("Payment cancelled");
          };
        },
      });
    } else {
      toast("Parcel creation cancelled");
    }
  };

  return (
    <div className="px-6 max-w-7xl mx-auto space-y-5 my-8">
      <h1 className="text-3xl font-bold text-center text-secondary">Parcel Form</h1>
      <p className="text-center text-primary">
        Door to door delivery made easy
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Parcel Info */}
        <fieldset className="border border-secondary rounded-xl p-4 bg-accent">
          <legend className="text-lg font-bold mb-2">Parcel Info</legend>

          <div className="form-control text-primary font-semibold">
            <label className="label font-semibold">Parcel Type</label>
            <div className="flex gap-6">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  value="document"
                  {...register("type", { required: true })}
                  className="radio radio-primary bg-white"
                />
                <span className="ml-2">Document</span>
              </label>
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  value="non-document"
                  {...register("type", { required: true })}
                  className="radio radio-primary bg-white"
                />
                <span className="ml-2">Non-Document</span>
              </label>
            </div>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">
                Parcel type is required
              </p>
            )}
          </div>

          <div className="form-control mt-4">
            <label className="label text-info">Title</label><br />
            <input
              type="text"
              {...register("title", { required: true })}
              className="input input-bordered"
              placeholder="Parcel title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">Title is required</p>
            )}
          </div>

          {parcelType === "non-document" && (
            <div className="form-control mt-4">
              <label className="text-info label">Weight (kg)</label><br />
              <input
                type="number"
                step="0.01"
                {...register("weight")}
                className="input input-bordered"
                placeholder="Enter weight (optional)"
              />
            </div>
          )}
        </fieldset>

        {/* Sender & Receiver Info Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sender Info */}
          <fieldset className="border border-secondary bg-accent text-primary font-semibold rounded-xl p-4">
            <legend className="text-lg font-semibold mb-2">Sender Info</legend>
            <div className="space-y-4">
              <input
                type="text"
                {...register("sender_name", { required: true })}
                className="input input-bordered w-full"
                placeholder="Name"
              />
              <input
                type="tel"
                {...register("sender_contact", { required: true })}
                className="input input-bordered w-full"
                placeholder="Contact"
              />

              <select
                {...register("sender_region", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Region</option>
                {uniqueRegions?.map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>

              <select
                {...register("sender_service_center", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Service Center</option>
                {getServiceCenters(selectedSenderRegion)?.map((sc, index) => (
                  <option key={index} value={sc}>
                    {sc}
                  </option>
                ))}
              </select>

              <textarea
                {...register("sender_address", { required: true })}
                className="textarea textarea-bordered w-full"
                placeholder="Address"
              ></textarea>
              <textarea
                {...register("pickup_instruction", { required: true })}
                className="textarea textarea-bordered w-full"
                placeholder="Pickup Instructions"
              ></textarea>
            </div>
          </fieldset>

          {/* Receiver Info */}
          <fieldset className="border border-secondary bg-accent text-primary font-semibold rounded-xl p-4">
            <legend className="text-lg font-semibold mb-2">
              Receiver Info
            </legend>
            <div className="space-y-4">
              <input
                type="text"
                {...register("receiver_name", { required: true })}
                className="input input-bordered w-full"
                placeholder="Name"
              />
              <input
                type="tel"
                {...register("receiver_contact", { required: true })}
                className="input input-bordered w-full"
                placeholder="Contact"
              />

              <select
                {...register("receiver_region", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Region</option>
                {uniqueRegions?.map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>

              <select
                {...register("receiver_service_center", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Service Center</option>
                {getServiceCenters(selectedReceiverRegion)?.map((sc, index) => (
                  <option key={index} value={sc}>
                    {sc}
                  </option>
                ))}
              </select>

              <textarea
                {...register("receiver_address", { required: true })}
                className="textarea textarea-bordered w-full"
                placeholder="Address"
              ></textarea>
              <textarea
                {...register("delivery_instruction", { required: true })}
                className="textarea textarea-bordered w-full"
                placeholder="Delivery Instructions"
              ></textarea>
            </div>
          </fieldset>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-secondary btn-outline bg-accent hover:text-info"
          >
            Submit Parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
