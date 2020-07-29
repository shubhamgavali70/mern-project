import { API } from "../../backend";
//category calls
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//delete category

export const deleteCategory = (categoryID, userID, token) => {
  return fetch(`${API}/category/${categoryID}/${userID}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//update category

export const updateCategory = (categoryID, userID, token, category) => {
  return fetch(`${API}/category/${categoryID}/${userID}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//get one category
export const getOneCategory = (categoryID) => {
  return fetch(`${API}/category/${categoryID}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//get all categories

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//product calls
//create product
export const createProduct = (userID, token, product) => {
  return fetch(`${API}/product/create/${userID}`, {
    method: "POST",
    headers: {
      Accept: "application/json",

      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
//get all products
export const getProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//delete a product

export const deleteProduct = (productID, userID, token) => {
  return fetch(`${API}/product/${productID}/${userID}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",

      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//get one product
export const getOneProduct = (productID) => {
  return fetch(`${API}/product/${productID}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//update a product
export const updateProduct = (productID, userID, token, product) => {
  return fetch(`${API}/product/${productID}/${userID}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
