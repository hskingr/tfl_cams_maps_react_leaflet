import React from "react";
import { Marker, Popup, Icon } from 'react-leaflet'
import RoomIcon from '@mui/icons-material/Room';
import L from 'leaflet';
import './components-styles/leaflet.css'



function ApiMarker(props) {

  function clicked(e) {
    console.log(props.map)
    props.map.setView(e.latlng, 20, { animation: true });
  }

      return (
        <Marker eventHandlers={{
    click: (e) => {
      clicked(e)
    },
  }} position={[ props.lat, props.long ]} >
        <Popup style={{ width: '300px' }} >
        {props.marker.name} <br />
        <a href={props.marker.url}> link </a>
        <video style={{ width:'300px' }} autoplay="true" src={props.marker.url}type="video/mp4" />
        </Popup>
      </Marker>
      )
}

export default ApiMarker