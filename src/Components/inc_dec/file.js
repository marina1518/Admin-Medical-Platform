import React,{useState} from "react";
import './file.css';

const Slot=(props)=>{
    var [num , setnum] =useState(0);
    const inc = ()=>{
        num+=1;
        if (num <=24) setnum(num);
        else  if (num === 24 || num > 24 )
        {
          num =24; 
          setnum(24);
        }};
    
      const dec = ()=>{
        num-=1;
        if (num >=0) setnum(num);
        else if (num ===0 || num <0 )
        {
         num =0;
          setnum(0);
        }};
        if (props.setfrom !== undefined)
        {
            props.setfrom(num);
        }
        if (props.setto !== undefined)
        {
            props.setto(num);
        }
        
       
    return(
        <body>
    <div className="container_block">
      <button className="minus" onClick={dec}>
        <span>-</span>
      </button>
      <span className="num">{num}</span>
      <button className="plus" onClick={inc}>
        <span>+</span>
        <span></span>
      </button>
    </div>
    </body>
    )

}
export default Slot;