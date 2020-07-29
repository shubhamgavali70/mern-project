import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { getOneCategory, updateCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const preloadCategory = (categoryID) => {
    getOneCategory(categoryID).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    preloadCategory(match.params.categoryID);
  }, []);

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
          Admin home page
        </Link>
      </div>
    );
  };

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    console.log(name);
    console.log(match.params.categoryID);
    //backend req fired
    updateCategory(match.params.categoryID, user._id, token, { name }).then(
      (data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      }
    );
  };

  const successMessage = () => {
    if (success) {
      return (
        <p className="alert alert-success">Category updated successfully</p>
      );
    }
  };

  const errorMessage = () => {
    if (error) {
      return (
        <p className="alert alert-danger mt-2">Failed to update category</p>
      );
    }
  };

  const makeCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the category</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="For Ex. Casual, Loafers"
          />
          <button onClick={onSubmit} className="btn btn-outline-info">
            Update Category
          </button>
        </div>
      </form>
    );
  };
  return (
    <Base
      title="Create category here"
      description="Add a new category for new shoes"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {makeCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};
export default UpdateCategory;
