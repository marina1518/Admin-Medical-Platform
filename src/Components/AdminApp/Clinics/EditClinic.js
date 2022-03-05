import React from 'react'
import EntityEdit from '../Entity/EditEntity'
function EditClinic(props) {
  return (
    <div>
     <EntityEdit entity='clinics' editdata={props.editdata} changeedit={props.changeedit} goback={props.goback}/>    
    </div>
  )
}

export default EditClinic