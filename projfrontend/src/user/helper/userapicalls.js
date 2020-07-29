import { API } from "../../backend";

export const getUser = (userID, token) => {
  return fetch(`${API}/user/${userID}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const updateUser = (userID, token, info) => {
  return fetch(`${API}/user/${userID}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(info),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const addProductToPurchaseList = (userID, token, purchase) => {
  return fetch(`${API}/orders/user/${userID}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: purchase,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
