import React,{useState} from "react";
import { Form,Button,Container,Row,Col,Figure,Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaUser,FaLock} from 'react-icons/fa';
import { Link , useNavigate} from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import axios from "axios";
import { signin,logout } from "../../actions";
import { useJwt } from "react-jwt";
//import pass from "./../image/pass.png";
//import './login.css'


const Login=()=>{
  
    let navigate = useNavigate();
    const routing_login =(type)=>{
      if (type === "owner"){navigate ('/appadmin')}
      else if (type === "c_admin"){navigate('/clinicdoctor')}
      else if (type === "p_admin"){navigate('/pharmacyadmin')}
      else if (type === "h_admin"){navigate('/hospitaladmin')}
      else if (type === "doctor"){navigate('/doctor')}
    }
    const token = useSelector(state => state.auth) //state of token 
    //console.log(token)
    const { decodedToken, isExpired } = useJwt(token);
    const [error_email,sete_error]=useState("");
    const [error_pass, setp_error]=useState("");
    const dispatch = useDispatch();
    const login_api = ()=>{
            axios.post('https://future-medical.herokuapp.com/login/doctor',
         {
                    email : data.email ,
                    pass : data.password ,  
         }).then((res)=>{
           console.log(res.data);           
           dispatch(signin(res.data.token,res.data.role));
           console.log(token)
           routing_login(res.data.role);
           
         }).catch(function (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      if (error.response.data === "incorrect email")
      {
        sete_error("!! incorrect email");
      }
      else if (error.response.data === "incorrect password")
      {
        setp_error("!! incorrect password");
      }
      
      ///Handle data => [incorrect email , incorrect password ]
      //console.log(error.response.headers);
    }
})
    }  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("");
    //const [token , settoken] = useState("");
    //const [data, submit] = useState([{"email":null, "password":null}]);

    const data = [
        {email: "", password : "" , type:""}
    ];
    
    const [error_e,seterror_e] = useState("");
    const [error_p,seterror_p] = useState("");
    const [flag,setflag] = useState(0);
    const submit_value =(e) => {
        e.preventDefault();
        //submit(email,password); 
       var flag = 0; 
        if (email==="")
        {
          seterror_e("Email required");
          //setflag(1);
          flag=1;
         console.log(flag);
        }
        if (password==="")
        {
          seterror_p("Password required");
         // setflag(1);
         flag=1;
        }
        if (flag === 0)
        {
          data.email=email;
          data.password=password;
          data.type=type;
          login_api(); //Call login Api 
          //console.log(data);
        }
        

    };


    return(
        
        <Container style={{marginTop:'100px'}}>
        {/* <h1 className="shadow-sm text-primary mt-5 p-3 text-center rounded">Login</h1> */}
        
      
        <Row className="mt-5"  lg={4} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
        <Col lg={4} md={6} sm={12} >
        {/* <Figure>
        <Figure.Image
        width={171}
        height={180}
        alt="171x180"
        src={pass}
        />
       
        </Figure> */}

<Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      //src={pass}
      alt="First slide"
    />
   
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Second slide&bg=282c34"
      alt="Second slide"
    />

   
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Third slide&bg=20232a"
      alt="Third slide"
    />

   
  </Carousel.Item>
</Carousel>

        </Col>
        

            <Col lg={4} md={6} sm={12} >

            
           


            <h1 className="shadow-sm mt-5 p-3 text-center rounded" style={{color:"#06a3da"}}>Welcome Back</h1>
            <br/>
                <Form onSubmit={submit_value}>
               
                    <Form.Group controlId="formBasicEmail">
                    <FaUser style={{color:"#06a3da"}}/> <Form.Label>  Email address </Form.Label>
                     <Form.Control type="email" placeholder="Enter email"  onChange={(e)=>{setEmail(e.target.value); seterror_e("");}}/> 
                     <h6 style={{color:"red"}}>{error_email}</h6>
                     <h6 style={{color:"red"}}>{error_e}</h6>  
                    </Form.Group>
<br/>
                    <Form.Group controlId="formBasicPassword">
                    <FaLock style={{color:"#06a3da"}}/> <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value); seterror_p("");}} />
                        <h6 style={{color:"red"}}>{error_pass}</h6> 
                        <h6 style={{color:"red"}}>{error_p}</h6>
                    </Form.Group>
                    <br></br>
                    <div className="d-grid">
                    <Button variant="primary btn-block" type="submit" onSubmit={submit_value}>
                        Login
                    </Button>
                    </div>
                    
                </Form>
            </Col>
        </Row>
        
    </Container>
    )
}
export default Login;