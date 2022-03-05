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

export const signin = (token,usertype)=>{
    return {type : "Signin" , token : token , usertype : usertype } 
}

export const logout = ()=>{
    return {type : "logout"} 
}