export const hospitals = ()=>{
    return {type : "hospitals"} 
}

export const clinics = ()=>{
    return {type : "clinics"} 
}

export const chart = ()=>{
    return {type : "chart"} 
}

export const pharmacies = ()=>{
    return {type : "pharmacies"} 
}

export const announcments = ()=>{
    return {type : "announcments"} 
}
export const appointments = ()=>{
    return {type : "appointments"} 
}

export const orders = ()=>{
    return {type : "orders"} 
}
export const info = ()=>{
    return {type : "info"} 
}
export const history = ()=>{
    return {type : "history"} 
}
export const prescription = ()=>{
    return {type : "prescription"} 
}
/*export const signin = (token,usertype)=>{
    return {type : "Signin" , token : token , usertype : usertype } 
}*/
export const signin = (state)=>{
    return {type : "Signin" , state : state } 
}

export const logout = ()=>{
    return {type : "logout"} 
}
<<<<<<< HEAD


export const channel_name = (state)=>{
    return {type : "channel_name", state:state} 
}
export const patient_details = (state)=>{
    return {type : "patient_details", state:state} 
}
=======
>>>>>>> b5b89da1d4c4750cf6fe5cf0635e8ab196b18f24
