const profile_reducer = (state = "info" , action)=>{
switch(action.type){
case "info":
    return "info" ;
case "history" :
    return "history"  ;  
case "prescription" :
    return "prescription"   ;   

default :
     return state ;
}
}
export default profile_reducer ;