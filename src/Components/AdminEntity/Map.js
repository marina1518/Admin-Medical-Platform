import React, { useState } from 'react'
import { Map , Marker, ZoomControl} from 'pigeon-maps'
import Tooltip from '@mui/material/Tooltip';
import './map.css'
import { useLocation } from "react-router-dom";

export function MyMap(props) {
  const location = useLocation();  
  const [elocation, setelocation] = useState(location.state ? location.state : "");  

  console.log(elocation)
  const [center, setCenter] = useState([elocation.latitude, elocation.longitude])
  const [zoom, setZoom] = useState(15)
    const [hue, setHue] = useState(0);
  const color = `hsl(${hue % 360}deg 39% 70%)`;
     const [isShown, setIsShown] = useState({
    status: false,
  });
  return (
    <>
    <div className="map">
    <Map 
      //height={500}
      center={center} 
      zoom={zoom}        
    >
         <ZoomControl />
         
          <Marker
            onMouseOver={() =>
                  setIsShown({
                    status: true,                    
                  })
                }
             onMouseOut={() =>
                  setIsShown({
                    status: false,                   
                  })
                }                    
            width={50}           
            color={color}
            anchor={[elocation.latitude, elocation.longitude]}
          />
           
             </Map>
      </div>
            <div>
        {isShown.status && (
          <div className="map-status">
            <div>Entity's current location</div>
          </div>
        )}
      </div>
     </>
   
  )
}