import React from 'react'
import {useNavigate,Navigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
function PrivateEntity({ children }) {
  const token = JSON.parse(useSelector(state => state.auth)) //state of token 
  console.log(token); 
  return (token.token&&(token.role==="h_admin"||token.role==="c_admin")) ? children : <Navigate to="/" />;
 
}

export default PrivateEntity