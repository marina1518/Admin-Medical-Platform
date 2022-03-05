import React from 'react'
import EntityEdit from '../Entity/EditEntity'
function EditHospitals(props) {
  return (
    <div>
       <EntityEdit entity='hospitals' editdata={props.editdata} changeedit={props.changeedit} goback={props.goback}/>
    </div>
  )
}

export default EditHospitals