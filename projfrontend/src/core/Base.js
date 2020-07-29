import React, { useRef } from "react";
import Menu from "./Menu";
import { Power3, gsap } from "gsap";
import { useEffect } from "react";
import "../styles.css";
const Base = ({
  title = "My title",
  description = "My description",
  className = "bg-dark text-white p-4 text-center",
  children,
}) => {
  useEffect(() => {
    gsap.to(head, 1, { opacity: 1, ease: Power3.easeInOut });
  });
  let head = useRef(null);

  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div
          ref={(el) => {
            head = el;
          }}
          className="jumbotron bg-dark text-white text-center"
        >
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      {/* <footer className="footer bg-dark mt-auto py-3">
          <div className="container-fluid bg-success text-white text-center py-3">
            <h4>If you got any questions, feel free to reach out!</h4>
            <button className="btn btn-warning btn-lg">Contact us</button>
          </div>
          <div className="container">
            <span className="text-muted">
              An amazing <span className="text-white">MERN</span> bootcamp
            </span>
          </div>
        </footer> */}
    </div>
  );
};
export default Base;
