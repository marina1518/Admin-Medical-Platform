import React from 'react'
import EntityEdit from '../Entity/EditEntity'
function EditPharmacy(props) {
  return (
    <div>
     <EntityEdit entity='pharmacies' editdata={props.editdata} changeedit={props.changeedit} goback={props.goback}/>
    </div>
  )
}

export default EditPharmacy