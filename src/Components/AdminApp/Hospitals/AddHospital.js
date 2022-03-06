import React from 'react'
import AddEntity from '../Entity/AddEntity';
import axios from 'axios'
function AddHospital(props) {
  
  return (
    <div>
     <AddEntity  entity='hospitals' goback={props.goback} changeadd={props.changeadd}/>
    </div>
  )
}

export default AddHospital