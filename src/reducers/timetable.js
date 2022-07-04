const entry_state = JSON.stringify([])
const timetable_reducer = (state = entry_state , action)=>{ //APP ADMIN
switch(action.type){
case "timetable_status":
    console.log(action.state);
    return JSON.stringify(action.state) ;
default :
     return state ;
}
}

export default timetable_reducer ;