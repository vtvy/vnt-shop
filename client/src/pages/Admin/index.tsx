import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import BodyAdmin from "../../components/BodyAdmin";
import HeaderAdmin from "../../components/HeaderAdmin";
import SidebarAdmin from "../../components/SidebarAdmin";
import "./AdminStyle.scss";

const Admin = () => {
  return (
    <Container fluid className="admin-page">
      <Row className="h-100 ">
        <Col sm={2} className="p-0">
          <SidebarAdmin />
        </Col>
        <Col sm={10} className="p-0">
          <HeaderAdmin />
          <BodyAdmin />
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
