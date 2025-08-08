import React from "react";

const FAQ = () => {
  return (
    <div  data-aos='zoom-out' className="m-3 md:my-12">
      <h2 className="text-[40px] font-extrabold text-secondary text-center">
        Frequently Asked Question (FAQ)
      </h2>
      <p className="my-5 md:w-2/3 mx-auto text-center">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce pain, and strengthen your body with
        ease!
      </p>

      <div className="collapse collapse-arrow bg-base-100 border border-base-300 my-3">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-lg text-secondary font-bold">
          How does this posture corrector work?
        </div>
        <div className="collapse-content text-sm">
          A posture corrector works by providing support and gentle alignment to
          your shoulders, back, and spine, encouraging you to maintain proper
          posture throughout the day. Here’s how it typically functions: A
          posture corrector works by providing support and gentle alignment to
          your shoulders.
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-100 border border-base-300 my-3">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-lg text-secondary font-bold">
          Is it suitable for all ages and body types?
        </div>
        <div className="collapse-content text-sm">
          Click on "Forgot Password" on the login page and follow the
          instructions sent to your email.
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-100 border border-base-300 my-3">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-lg text-secondary font-bold">
          Does it really help with back pain and posture improvement?
        </div>
        <div className="collapse-content text-sm">
          Go to "My Account" settings and select "Edit Profile" to make changes.
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-100 border border-base-300 my-3">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-lg text-secondary font-bold">
          Does it have smart features like vibration alerts?
        </div>
        <div className="collapse-content text-sm">
          Go to "My Account" settings and select "Edit Profile" to make changes.
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-100 border border-base-300 my-3">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-lg text-secondary font-bold">
          How will I be notified when the product is back in stock?
        </div>
        <div className="collapse-content text-sm">
          Go to "My Account" settings and select "Edit Profile" to make changes.
        </div>
      </div>
    </div>
  );
};

export default FAQ;
