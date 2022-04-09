import React from "react";
import { Route, Routes } from "react-router-dom";
import Seller from "../../features/Seller";
import "./BodyStyle.scss";

const Body = () => {
  return (
    <div className="body-admin">
      <Routes>
        <Route path="/seller/*" element={<Seller />} />
      </Routes>
    </div>
  );
};

export default Body;
