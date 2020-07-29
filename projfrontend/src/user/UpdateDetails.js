import React, { useState } from "react";
import Base from "../core/Base";
import { updateUser, getUser } from "./helper/userapicalls";
import { isAuthenticated } from "../auth/helper";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";

export default function UpdateDetails() {
  const [values, setValues] = useState({
    email: "",
    name: "",
    error: "",
    success: false,
  });
  const { name, email, error, success } = values;
  const userID = isAuthenticated().user._id;
  const token = isAuthenticated().token;
  const preload = (userID, token) => {
    getUser(userID, token).then((user) => {
      setValues({
        email: user.email,
        name: user.name,
      });
    });
  };
  useEffect(() => {
    preload(userID, token);
  }, []);
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  console.log({ values });
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    updateUser(userID, token, values)
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            style={{ display: success ? "" : "none" }}
            className="alert alert-success"
          >
            Account was updated successfully..
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            style={{ display: error ? "" : "none" }}
            className="alert alert-danger"
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const updateForm = () => (
    <form action="">
      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          onChange={handleChange("email")}
          value={email}
          placeholder="Enter email"
        />
      </div>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange("name")}
          value={name}
          placeholder="Enter name"
        />
      </div>
      <button className="btn btn-success btn-block" onClick={onSubmit}>
        Update
      </button>
    </form>
  );

  return (
    <div>
      <Base title="UpdateUserDetails" description="UpdateUserDetails">
        <div className="container">
          {successMessage()}
          {errorMessage()}
          {updateForm()}
        </div>
      </Base>
    </div>
  );
}
