import React from "react";
import { Route, Routes } from "react-router-dom";
import TableCreate from "./components/TableCreate";
import List from "./Pages/List";

const Seller = () => {
  return (
    <div>
      <Routes>
        <Route path="/list" element={<List />} />
        <Route path="/create" element={<TableCreate />} />
      </Routes>
    </div>
  );
};

export default Seller;
