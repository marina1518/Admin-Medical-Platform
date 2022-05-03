import React from 'react'
import  ModalImage  from 'react-modal-image'
import './Apporder.css'
export default function OrderImage(props) {
  return (
    <div size='small'>
        <div >    
        <ModalImage
          //small={'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGljfGVufDB8fDB8fA%3D%3D&w=1000&q=80'}
          //large={'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGljfGVufDB8fDB8fA%3D%3D&w=1000&q=80'}
          small={props.pic}
          large={props.pic}
          alt={"order Image"}
          hideDownload={true}
          hideZoom={true}
          className="modal-image" 
        />    
</div>
</div>
  )
}
