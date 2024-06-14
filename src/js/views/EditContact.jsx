import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";





const EditContact = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  const [contactEdit, setContactEdit] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

 console.log(params.id);

  function handleChange(e) {
    setContactEdit({ ...contactEdit, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await actions.editContact(params.id, contactEdit);
    if(response){
      navigate("/");
    } else{
      toast.error("Contact could not be edited")
    }
  }
  useEffect(() => {
    if (params.id && store.contacts.length > 0) {
      setContactEdit(store.contacts.find((item) => item.id == params.id));
    }
  }, [params.id, store.contacts]);
  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <p className="fs-1">Edit Contact</p>
      </div>
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={(e) => handleChange(e)}
            defaultValue={contactEdit.name}
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
            defaultValue={contactEdit.address}
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
            defaultValue={contactEdit.phone}
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
            defaultValue={contactEdit.email}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditContact;
