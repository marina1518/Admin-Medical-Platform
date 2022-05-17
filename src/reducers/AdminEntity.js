const Admin_Entity_reducer = (state = "entity_info" , action)=>{
switch(action.type){
case "entity_info":
    return "entity_info" ;     
case "entity_appointments" :
    return "entity_appointments"  ;  
case "entity_doctors" :
    return "entity_doctors"  ;              
default :
     return state ;
}
}
export default Admin_Entity_reducer ;