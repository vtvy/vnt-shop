import React from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const breadcrumbItem = location.pathname
    .split("/")
    .filter((item) => item !== "");

  return (
    <Container className="breadcrumb-container">
      <div className=" breadcrumb rounded shadow bg-white">
        {breadcrumbItem.map((item) => (
          <div className="breadcrumb-item" key={item}>
            {item}
            <div className="triangle"></div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Breadcrumb;
