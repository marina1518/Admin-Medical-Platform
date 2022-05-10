const entry_state = JSON.stringify("");
const patient_reducer = (state = entry_state , action)=>{
    switch(action.type){
    case "patient_details":
        console.log(action.state);
        return (JSON.stringify(action.state)) ;
               
    default :
         return state ;
    }
    }
    export default patient_reducer ;