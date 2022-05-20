import React from 'react'
import Grid from '@mui/material/Grid';

function OneMed(props) {
    console.log(props)
  return (
    <div>
          
          <span>{props.medicine.medicine} : </span>
          
         
           <span>{props.medicine.quanity} </span>
         
        </div>
  )
}

export default OneMed