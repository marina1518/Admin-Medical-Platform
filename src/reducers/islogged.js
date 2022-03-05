const auth_reducer = (state = {token:"",usertype:""} , action)=>{
switch(action.type){
case "Signin":
    return {token : action.token , usertype : action.usertype } 
    //return action.token,action.usertype ; 
case "logout" :
    return {token : "" , usertype : "" }     //remove token 
default :
     return state ;
}
}

export default auth_reducer ;