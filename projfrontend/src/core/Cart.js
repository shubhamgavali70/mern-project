import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import "./helper/empty.png";
//import StripeCheckout from "./StripeCheckout";
import PaymentB from "./PaymentB";
const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>This section is to load all products</h2>
        {products.map((p, index) => (
          <Card
            key={index}
            product={p}
            removeFromCart={true}
            addToCart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  return (
    <Base title="Cart page" description="Ready to checkout!">
      <div className="row">
        <div className="col-lg-6 col-sm-12">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <div>
              <h3>Your cart is empty!</h3>
              <img
                src="https://www.amanfeedindustries.com/uploads/images/helpcenter/shoppingempty.png"
                alt=""
              />
            </div>
          )}
        </div>
        <div className="col-lg-6 col-sm-12">
          {/* <StripeCheckout
            products={products}
            setReload={setReload}
            reload={reload}
          /> */}
          <PaymentB products={products} setReload={setReload} reload={reload} />
        </div>
      </div>
    </Base>
  );
};
export default Cart;
