import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { getmeToken, processPayment } from "./helper/paymentbhelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";
import { Link } from "react-router-dom";
import { addProductToPurchaseList } from "../user/helper/userapicalls";

const PaymentB = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userID = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      //console.log("INFORMATION", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };
  //console.log(info.clientToken);
  console.log(products);

  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <h3>Please login or add something to cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userID, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userID, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });
          //console.log("PAYMENT SUCCESS");
          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
          };
          createOrder(userID, token, orderData);
          // addProductToPurchaseList(userID, token, orderData.products)
          //   .then((res) => console.log(res))
          //   .catch((err) => console.log(err));
          cartEmpty(() => {
            //console.log("Did we got a crash?");
          });

          setReload(!reload);
        })
        .catch((error) => {
          setInfo({ loading: false, success: false });
          //console.log("PAYMENT FAILED");
        });
    });
    // addProductToPurchaseList(userID, token, products)
    //   .then((a) => console.log(a))
    //   .catch((err) => console.log(err));
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div>
      <h3>Your bill is {getAmount()} $</h3>
      {isAuthenticated() ? (
        showbtdropIn()
      ) : (
        <div>
          <h3>
            Please <Link to="/signin">login</Link> to purchase
          </h3>
        </div>
      )}
    </div>
  );
};
export default PaymentB;
