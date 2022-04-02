import React from "react";
import { Container, Row } from "react-bootstrap";

const Breadcrumb = () => {
  return (
    <div className="breadcrumb-container">
      <div className=" breadcrumb mx-3 mt-5 rounded shadow bg-white">
        <div className="breadcrumb-item">
          <div className="triangle"></div>
        </div>
        {/* <div className="breadcrumb-item"></div> */}
      </div>
    </div>
  );
};

export default Breadcrumb;
