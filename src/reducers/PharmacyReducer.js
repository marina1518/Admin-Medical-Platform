const Pharmacy_reducer = (state = "pharmacy_info" , action)=>{
switch(action.type){
case "pharmacy_info":
    return "pharmacy_info" ;
case "orders_pharma" :
    return "orders_pharma"  ;   
case "pending_orders" :
    return "pending_orders" ;  
case "approved_orders" :
    return "approved_orders"   ;
case "pharma_history" :
    return "pharma_history"  ;                
default :
     return state ;
}
}
export default Pharmacy_reducer ;