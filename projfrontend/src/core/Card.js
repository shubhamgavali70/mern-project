import React, { useState, useEffect, useRef } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFormCart } from "./helper/cartHelper";
import "../styles.css";
import { gsap, Power3 } from "gsap";
const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const cardTitle = product ? product.name : "A photo from pexels";
  const cardDescription = product ? product.description : "Default description";
  const cardPrice = product ? product.price : "Defualt price";

  const [redirect, setRedirect] = useState(false);

  const addToCartMethod = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={addToCartMethod}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };
  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFormCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };
  let card = useRef(null);
  useEffect(() => {
    gsap.to(card, 1, { opacity: 1, ease: Power3.easeInOut });
  });
  return (
    <div
      ref={(el) => {
        card = el;
      }}
      className="card text-white bg-dark border border-info "
    >
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <ImageHelper product={product} style={{ objectFit: "cover" }} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addToCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};
export default Card;
