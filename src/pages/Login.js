import React, { useState } from "react";
import Select from 'react-select';
import { useParams, Redirect } from "react-router-dom";
import { TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCamera } from "@fortawesome/free-solid-svg-icons";
import QrReader from "react-qr-reader";
import QrcodeDecoder from 'qrcode-decoder';

import CoreButton from "../components/core/Button";
import { useAuth } from "../services/authorization";
import { universalLogin } from "../apis/spehr";
import { AUTHORITY_TYPES } from "../Constants/authorityTypes";
import {

  CreateAccountText,
  PageName,
  SubContainer2,
  TextFieldContainer,
} from "./Login.styled";

// const options = [
//   { value: '1', label: 'Hospital 1' },
//   { value: '2', label: 'Hospital 2' },
//   { value: '3', label: 'Hospital 3' },
// ];

const PatientLogin2 = () => {
  const auth = useAuth();

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [hospital, setHospital] = useState(null);
  const [pk, setPK] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
//  const [selectedOption, setSelectedOption] = useState(null);


  const { type } = useParams();
  const AuthorityTypes =
    type === "patient"
      ? AUTHORITY_TYPES.PATIENT
      : type === "hospital"
      ? AUTHORITY_TYPES.DOCTOR
      : AUTHORITY_TYPES.ADMIN;

  function login() {
    console.log(type)
    setIsLoggingIn(true);
    universalLogin(pk, AuthorityTypes)
      .then((info) => {
        const successfulLogin = auth.login(pk, AuthorityTypes, info);
        if (successfulLogin)
          console.log(`Login successful with following ${type} info: `, info);
        else console.log("Some err logging in!, ", successfulLogin);
        setIsLoggingIn(false);
      })
      .catch((err) => {
        alert("Invalid private key !!");
        console.log("Login failed :( with following response: ");
        console.log(err);
        setIsLoggingIn(false);
      });
  }


  if (auth.loggedIn) {
    const path = `/${type}Dashboard`;
    console.log(path);
    return <Redirect to={path} />;
  }

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <SubContainer2>
        <PageName>
          {type === "patient"
            ? "Patient"
            : type === "hospital"
            ? "Doctor"
            : "Admin"}{" "}
          Login
        </PageName>

        <TextFieldContainer>
            {/* <TextField
              label="Username"
              required
              fullWidth
              autoComplete="nope"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{marginBottom:"5%"}}
            />
            <TextField
              label="Password"
              required
              fullWidth
              autoComplete="nope"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{marginBottom:"5%"}}
            />
            {type === "hospital" || type === "admin" ?
              <Select
                defaultValue={hospital}
                onChange={setHospital}
                options={options}
                placeholder="Select Hospital..."
            /> : ""} */}
            <TextField
              label="Private Key"
              required
              fullWidth
              autoComplete="nope"
              value={pk}
              onChange={(e) => setPK(e.target.value)}
            />
        </TextFieldContainer>
        
        <CoreButton
          disabled={isLoggingIn}
          style={{ marginTop: "80px" }}
          onClick={!isLoggingIn ? login : null}
        >
          {isLoggingIn ? (
            <>
              Trying to login. &nbsp;&nbsp;
              <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
            </>
          ) : (
            "Login"
          )}
        </CoreButton>
        <CreateAccountText>
          New user? visit nearest center to register yourself
        </CreateAccountText>
      </SubContainer2>
    </div>
  );
};

export default PatientLogin2;
