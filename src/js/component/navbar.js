import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="container-fluid navbar mb-3">
      <div className="container">
        <Link className="brand fs-1" to="/">
          Contact List
        </Link>
        <div className="ml-auto">
          <Link to="/create">
            {<button className="btn btn-primary">Create Contact</button>}
          </Link>
        </div>
      </div>
    </nav>
  );
};
