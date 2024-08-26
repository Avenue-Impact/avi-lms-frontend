import React, { useState } from "react";
import styles from "./GetInTouch.module.css";
import Button from "../Button";

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form data submitted:", formData);
  };

  return (
    <div

      className={`${styles.get_in_touch} px-8 py-10 pt-20 lg:px-14 lg:pt-16 2xl:px-20 2xl:py-[100px]`}
    >
      <div className={styles.get_in_touch_info}>
        <h4 className="text-2xl font-light 2xl:text-[40px] 2xl:leading-[40px]">
          Elevate Your Business with Avenue Impact
        </h4>
        <p className="2xl:text-xl 2xl:font-light">

          Let us be your partner in elevating your business to new levels of
          success. Our team of knowledgeable experts will collaborate with you
          to comprehend your specific needs and aspirations, and furnish
          customised solutions that promote growth and achievement. Get in touch
          with us today to embark on this exciting journey towards a thriving
          business.
        </p>
      </div>
      <form className={styles.get_in_touch_input} onSubmit={handleSubmit}>
        <label>
          {"{Your Name}"}
          <span>*</span>
        </label>
        <input
          type="text"
          name="name"
          // placeholder="Enter Your Name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>
          {"{Phone Number}"}
          <span>*</span>
        </label>
        <input
          type="text"
          name="phone"
          // placeholder="Enter Your Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />

        <label>
          {"{Email Address}"}
          <span>*</span>
        </label>
        <input
          type="email"
          name="email"
          // placeholder="Enter Your Email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>
          {"{Comment or Message}"}
          <span>*</span>
        </label>
        <input
          type="text"
          name="message"
          // placeholder="Write a message here"
          value={formData.message}
          onChange={handleChange}
        />

        <Button className="mt-8 lg:mt-11 " type="submit">
          Send a message
        </Button>

      </form>
    </div>
  );
};

export default GetInTouch;
