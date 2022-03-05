import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React,{useState} from 'react'
import { storage } from '../Firebase';
function Image() {

const [image,setimage]=useState("");    
const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    //console.log(file)
    uploadFiles(file);
  };

const uploadFiles = (file) =>{
if (!file) return
const storageRef = ref(storage,`/files/${file.name}`);
const uploadTask = uploadBytesResumable(storageRef,file);
uploadTask.on("state_changed",()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
        console.log(url); // saved in database
        //api calling to save in database
        setimage (url);
    }).catch((err)=>{console.log(err)})
})
}  
  return (
    <div>
       <form onSubmit={formHandler}>
        <input type="file" className="input" />
        <button type="submit">Upload</button>
      </form>
      <img src={image} alt='trial'></img>
    </div>
  )
}

export default Image