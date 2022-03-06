import React from 'react'
import AddEntity from '../Entity/AddEntity';
import axios from 'axios'
function AddClinic(props) { 
  return (
    <div>
     <AddEntity  entity='clinics' goback={props.goback} changeadd={props.changeadd}/>
    </div>
  )
}

export default AddClinic