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



export const channel_name = (state)=>{
    return {type : "channel_name", state:state} 
}
export const patient_details = (state)=>{
    return {type : "patient_details", state:state} 
}
