import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "./components/Header";
import "./AdminStyle.scss";
import Sidebar from "./components/Sidebar";
import Body from "./components/Body";

import { Provider } from "react-redux";

import { store } from "./redux/store";

const Admin = () => {
  return (
    <Provider store={store}>
      <Container fluid className="admin-page">
        <Row className="h-100 ">
          <Col className="p-0 ">
            <Sidebar />
          </Col>
          <Col sm={10} className="p-0">
            <Header />
            <Body />
          </Col>
        </Row>
      </Container>
    </Provider>
  );
};

export default Admin;
