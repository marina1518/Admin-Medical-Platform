import React from 'react'
import AddEntity from '../Entity/AddEntity';
import axios from 'axios'
function AddPharmacy(props) {
  
  return (
    <div>
     <AddEntity  entity='pharmacies' goback={props.goback} changeadd={props.changeadd} getpharmacies={props.getpharmacies}/>
    </div>
  )
}

export default AddPharmacy