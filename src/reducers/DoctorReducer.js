const Doctor_reducer = (state = "info" , action)=>{
switch(action.type){
case "doctor_info":
    return "doctor_info" ;
case "doctor_review" :
    return "doctor_review"  ;  
case "doctor_meeting" :
    return "doctor_meeting"   ;   
case "doctor_timetable" :
     return "doctor_timetable"; 

default :
     return state ;
}
}
export default Doctor_reducer ;