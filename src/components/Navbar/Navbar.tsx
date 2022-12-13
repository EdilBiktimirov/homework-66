import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar navbar-expand d-flex justify-content-between bg-gradient bg-info p-2 mb-2">
      <Link to={'/'} className="nav-link navbar-brand ">Calories tracker</Link>
      <Link to={'/add-meal'}  className="btn btn-outline-light">Add new Meal</Link>
    </div>
  );
};

export default Navbar;