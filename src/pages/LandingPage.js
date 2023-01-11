import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import PatientLoginIllustration from "../assets/LandingPage/PatientLoginIllustration.svg";
import AdminLoginIllustration from "../assets/LandingPage/AdminLoginIllustration.svg";
import HospitalLoginIllustration from "../assets/LandingPage/HospitalLoginIllustration.svg";
import {
  AppName,
  Backdrop,
  BlueLine,
  Container,
  Dropdown,
  DropdownItem,
  Home,
  Login,
  LoginButton,
  LoginContainer,
  LoginFlex,
  LoginImage,
  LoginText,
  Logo,
  Menu,
  MenuContainer,
  NavbarContainer,
  SubContainer1,
} from "./LandingPage.styled";
import { useAuth } from "../services/authorization";

const LandingPage = () => {
  const ref = useRef();
  const loginRef = useRef();
  const auth = useAuth();
  const history = useHistory();

  const [menu, setMenu] = useState(false);

  const scrollToLoginFlex = () => ref.current.scrollIntoView();
  const scrollToLoginFlexMobile = () => {
    setMenu(false);
    loginRef.current.scrollIntoView();
  };

  return (
    <Container>
      {menu && (
        <Backdrop
          onClick={() => {
            setMenu(false);
          }}
        />
      )}
      <NavbarContainer>
        <Logo />
        <AppName>SPEHR</AppName>
        <Home onClick={() => history.push("/home")}>
          Home
          <BlueLine />
        </Home>
        {/* {auth.loggedIn ? (
          <Login onClick={() => history.push("/dashboard")}>Dashboard</Login>
        ) : (
          <Login onClick={scrollToLoginFlex}>Login</Login>
        )} */}
        <MenuContainer open={menu}>
          <Menu onClick={() => setMenu(!menu)}></Menu>
          <Dropdown>
            <DropdownItem
              style={{ backgroundColor: "#DAE9FF" }}
              onClick={scrollToLoginFlexMobile}
            >
              Home
            </DropdownItem>
            <DropdownItem onClick={() => setMenu(!menu)}>Login</DropdownItem>
          </Dropdown>
        </MenuContainer>
      </NavbarContainer>
      <SubContainer1>
        <LoginText>Login To SPEHR</LoginText>
        <LoginFlex>
          <LoginContainer onClick={() => history.push("/login/patient")}>
            <LoginImage src={PatientLoginIllustration} />
            <LoginButton>Patient Login</LoginButton>
          </LoginContainer>
          <LoginContainer onClick={() => history.push("/login/hospital")}>
            <LoginImage src={HospitalLoginIllustration} />
            <LoginButton>Doctor login</LoginButton>
          </LoginContainer>
          <LoginContainer onClick={() => history.push("/login/admin")}>
            <LoginImage src={AdminLoginIllustration} />
            <LoginButton>Admin Login</LoginButton>
          </LoginContainer>
        </LoginFlex>
      </SubContainer1>
    </Container>
  );
};

export default LandingPage;
