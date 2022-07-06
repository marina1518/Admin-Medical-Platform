import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Figure,
  Carousel,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { signin, logout } from "../../actions";
import { useJwt } from "react-jwt";
//import pass from "./../image/pass.png";
import "./login.css";
import Deactivate from "./ModalDeactivate";

const Login = () => {
  let navigate = useNavigate();
  const routing_login = (type) => {
    if (type === "owner") {
      navigate("/appadmin");
    } else if (type === "c_admin") {
      navigate("/ClinicAdmin");
    } //remove clinic admin page same as hospital admin
    else if (type === "p_admin") {
      navigate("/pharmacyadmin");
    } else if (type === "h_admin") {
      navigate("/hospitaladmin");
    } else if (type === "doctor") {
      navigate("/doctor");
    }
  };
  const token = JSON.parse(useSelector((state) => state.auth)); //state of token

  let { decodedToken, isExpired } = useJwt(token.token);
  //console.log(token)
  //const { decodedToken, isExpired } = useJwt(token.token);
  //console.log(decodedToken);
  const [error_email, sete_error] = useState("");
  const [error_pass, setp_error] = useState("");
const [modalShow, setModalShow] = React.useState(false);
const [Entity_dec, set_Entity_dec] = useState("");

  const dispatch = useDispatch();


  const login_api = async () => {
    try {
        const resp = await axios.post("https://future-medical.herokuapp.com/login/doctor",{
           email: data.email,
           pass: data.password,
        }
        );
        const data_Api = await resp.data ;
        console.log(data_Api);
        ////// IF HOS ADMIN OR CLINIC ADMIN DEACTIVATED
        if(data_Api.role != "owner" && data_Api.role != "doctor") {
        if ((data_Api.entity.active == false) && (data_Api.role == "h_admin" || data_Api.role == "c_admin"))
        {
          setModalShow(true)
          set_Entity_dec(data_Api.entity.name)
          console.log("Deactivate")
          //////// MAKE THE FORM EMPTY Ask []
        }
        //console.log(decodetoken)
        else{
          dispatch(signin(data_Api)); //save all the state
          routing_login(data_Api.role);
        }
      }
      else {
        dispatch(signin(data_Api)); //save all the state
          routing_login(data_Api.role);
      }
    } catch (error) {
        // Handle Error Here
        console.error(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          if (error.response.data === "incorrect email") {
            sete_error("!! incorrect email");
          } else if (error.response.data === "incorrect password") {
            setp_error("!! incorrect password");
          }
    }
    }
};

  /*const login_api = async () => {
    try { 
      const res = await axios.post("https://future-medical.herokuapp.com/login/doctor", {
        email: data.email,
        pass: data.password,
      })
        const data = await res.data ;
        console.log(data);
        
        console.log(token);
        if ((data.entity.active == false) && (data.rule == "h_admin" || data.rule == "c_admin"))
        {
          console.log("Deactivate")
        }
        //console.log(decodetoken)
        else{
          dispatch(signin(data)); //save all the state
          routing_login(data.role);
        }
        
    }
    catch(error){
      if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          if (error.response.data === "incorrect email") {
            sete_error("!! incorrect email");
          } else if (error.response.data === "incorrect password") {
            setp_error("!! incorrect password");
          }
    }
  }
  
  };*/
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  //const [token , settoken] = useState("");
  //const [data, submit] = useState([{"email":null, "password":null}]);

  const data = [{ email: "", password: "", type: "" }];

  const [error_e, seterror_e] = useState("");
  const [error_p, seterror_p] = useState("");
  const [flag, setflag] = useState(0);
  const submit_value = (e) => {
    e.preventDefault();
    
    //submit(email,password);
    var flag = 0;
    if (email === "") {
      seterror_e("Email required");
      //setflag(1);
      flag = 1;
      console.log(flag);
    }
    if (password === "") {
      seterror_p("Password required");
      // setflag(1);
      flag = 1;
    }
    if (flag === 0) {
      data.email = email;
      data.password = password;
      data.type = type;
      login_api(); //Call login Api
      //console.log(data);
    }
  };

  return (
    <div className="login_container">
      <Container>
        <div className="form-container">
          <h1
            // className="shadow-sm mt-5 p-3 text-center rounded"
            style={{ color: "#06a3da" }}
          >
            Welcome Back
          </h1>
          <br />
          <div className="form-details">
            <Form onSubmit={submit_value}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FaUser style={{ color: "#06a3da" }} />{" "}
                <Form.Label> Email address </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    sete_error("");
                    seterror_e("");
                  }}
                />
                <h6 style={{ color: "red" }}>{error_email}</h6>
                <h6 style={{ color: "red" }}>{error_e}</h6>
              </Form.Group>
              <br />
              <Form.Group controlId="formBasicPassword">
                <FaLock style={{ color: "#06a3da" }} />{" "}
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setp_error("");
                    seterror_p("");
                  }}
                />
                <h6 style={{ color: "red" }}>{error_pass}</h6>
                <h6 style={{ color: "red" }}>{error_p}</h6>
              </Form.Group>
              <br></br>
              <div className="d-grid">
                <Button
                  variant="primary btn-block"
                  type="submit"
                  onSubmit={submit_value}
                >
                  Login
                </Button>
                <Deactivate
                 show={modalShow}
                onHide={() => setModalShow(false)}
                entity={Entity_dec}
                />
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Login;
