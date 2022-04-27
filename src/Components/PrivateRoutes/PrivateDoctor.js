import React from 'react'
import {useNavigate,Navigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
function Privatedoctor({ children }) {
  const token = JSON.parse(useSelector(state => state.auth)) //state of token 
  console.log(token); 
  return (token.token&&token.role==="doctor") ? children : <Navigate to="/" />;
 
}

export default Privatedoctor