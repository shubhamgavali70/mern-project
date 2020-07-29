import React, { useEffect, useRef } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import "../styles.css";
import { gsap, Power3 } from "gsap";
const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();
  let card = useRef(null);
  let card2 = useRef(null);
  useEffect(() => {
    gsap.to(card, 1, { opacity: 1, ease: Power3.easeInOut });
    gsap.to(card2, 1, { opacity: 1, ease: Power3.easeInOut });
  });
  const adminLeftSide = () => {
    return (
      <div
        ref={(el) => {
          card2 = el;
        }}
        className="card"
      >
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              Create category
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-success">
              Manage categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              Create product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-success">
              Manage products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-success">
              Manage order
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div
        ref={(el) => {
          card = el;
        }}
        className="card mb-4"
      >
        <h4 className="card-header">Admin information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name </span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email </span> {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-danger">Admin area</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to admin area"
      description="Manage all your products here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};
export default AdminDashBoard;
