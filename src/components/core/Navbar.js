import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

import { useAuth } from "../../services/authorization";

import SPEHRLogo from "../../assets/icons/SPEHRLogo.png";

const CustomNavbar = () => {
  const location = useLocation();
  console.log(location);

  const auth = useAuth();
  useEffect(() => {
    console.log("Auth status updated:", auth);
  }, [auth]);

  return location.pathname === "/" ? (
    <></>
  ) : (
    <Navbar collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            alt=""
            src={SPEHRLogo}
            width="30"
            className="d-inline-block align-top"
          />{" "}
          &nbsp; SPEHR
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse className="text-center">
          <Nav className="me-auto"></Nav>

          <Nav style={{ columnGap: "24px", alignItems: "center" }}>
            <Nav.Link as={Link} to="/dashboard">
              Home
            </Nav.Link>
            {auth.loggedIn ? (
              <Button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "30px",
                }}
                variant="light"
                onClick={auth.logout}
              >
                Logout
              </Button>
            ) : (
              ""
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
