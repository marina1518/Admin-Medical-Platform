const sidebarstate_reducer = (state = "chart" , action)=>{
switch(action.type){
case "chart":
    return "chart" ;
case "hospitals" :
    return "hospitals"  ;   
case "pharmacies" :
    return "pharmacies" ;  
case "clinics" :
    return "clinics"   ;
case "announcments" :
    return "announcments"  ;     
case "appointments" :
    return "appointments"  ;  
case "orders" :
    return "orders"  ;   
case "info" :
    return "info"  ;            
default :
     return state ;
}
}
export default sidebarstate_reducer ;