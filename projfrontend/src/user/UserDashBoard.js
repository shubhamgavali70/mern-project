import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getUser } from "./helper/userapicalls";
import { Link } from "react-router-dom";

const UserDashBoard = () => {
  const [userdetails, setUserdetails] = useState({
    email: "",
    name: "",
    purchases: [],
  });
  const { email, name, purchases } = userdetails;
  const userID = isAuthenticated().user._id;
  const token = isAuthenticated().token;
  const purchaseList = () => {
    purchases.map((p, i) => {
      return <p key={i}>{p}</p>;
    });
  };

  const getUserDetails = (userID, token) => {
    getUser(userID, token).then((user) => {
      setUserdetails({
        email: user.email,
        name: user.name,
        purchases: [...purchases],
      });
    });
  };

  const userLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">User Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/user/updatedetails" className="nav-link text-success">
              Update information
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userRightSide = () => {
    return (
      <table class="table table-dark container">
        <tbody>
          <tr>
            <td>
              <strong>Name</strong>
            </td>
            <td>{name}</td>
          </tr>

          <tr>
            <td>
              <strong>Email</strong>
            </td>
            <td>{email}</td>
          </tr>

          <tr>
            <td>
              <strong>Purchases</strong>
            </td>

            <td>
              {purchases.length > 0 ? purchaseList() : "Nothing in the list"}
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <Base title="Dashboard for user" description="See your details here..">
      {getUserDetails(userID, token)}
      <div className="row">
        <div className="col-3">{userLeftSide()}</div>
        <div className="col-6">{userRightSide()}</div>
      </div>
    </Base>
  );
};
export default UserDashBoard;
