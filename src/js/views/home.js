import React, { useContext } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { toast } from "sonner";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className=" container card p-0 border-0">
      {store.contacts.map((contact) => {
        return (
          <div
            key={contact.id}
            className="contact-card row d-flex justify-content-around align-items-center mb-3"
          >
            <div className="col-md-2 d-flex justify-content-center">
              <img
                src={`https://picsum.photos/200/200?random=${contact.id}`}
                className="img-fluid rounded-circle m-2"
              />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <h3 className="card-title mb-3">{contact.name}</h3>
                <p className="card-text">
                  <i className="fa-solid fa-location-dot me-2"></i>
                  <span>{contact.address}</span>
                </p>
                <p className="card-text">
                  <i className="fa-solid fa-phone"></i> {contact.phone}
                </p>
                <p className="card-text">
                  <i className="fa-solid fa-envelope"></i> {contact.email}
                </p>
              </div>
            </div>
            <div className="col-md-1 d-flex justify-content-center p-0 m-1">
              <Link to={"/edit/" + contact.id}>
                <button className="btn btn-outline-secondary me-1">
                  <i className="fa-solid fa-pencil"></i>
                </button>
              </Link>
              <button
                className="btn btn-outline-danger"
                onClick={() =>
                  toast.warning("Are you sure you want to delete?", {
                    action: {
                      label: "Yes",
                      onClick: () => {
                        actions.deleteContact(contact.id);
                      },
                    },
                  })
                }
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

//onClick={() => actions.deleteContact(contact.id)}
