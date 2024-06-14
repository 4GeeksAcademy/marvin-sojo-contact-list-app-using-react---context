import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const CreateContact = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  function handleChange(e) {
    setContact({ ...contact, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await actions.postContact(contact);
    if (response) {
      navigate("/");
    } else {
      toast.error("Contact could not be created");
    }
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <p className="fs-1">Create Contact</p>
      </div>
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="phone"
            className="form-control"
            name="phone"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateContact;
