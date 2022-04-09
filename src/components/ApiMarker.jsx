import React, { useState } from "react";
import { Marker, Popup, Icon } from 'react-leaflet'
import RoomIcon from '@mui/icons-material/Room';
import L from 'leaflet';
import { ZoomOut } from "@mui/icons-material";



function ApiMarker(props) {

  function recenter(map,latlng,offsetx,offsety) {
    const center = map.project(latlng);
    center = new L.point(center.x+offsetx,center.y+offsety);
    const target = map.unproject(center);
    map.panTo(target);
  }


  function closePopup() {
    const point = props.map.layerPointToLatLng([0,0])
    const centerPoint = props.map.getSize().divideBy(2)
    const bounds = props.map.getBounds()
    console.log(props.map.getCenter())
    props.map.setView(point, 15,  { animate: true })
  }

  function clicked(e) {
    props.map.setView(e.latlng, 18, { animate: true })
    const offset = props.map.getSize().y*0.2;
    props.map.panBy(new L.Point(0, -offset), {animate: false});
  }

    return (
        <Marker eventHandlers={{
        click: (e) => {
        clicked(e)
    },
  }} position={[ props.lat, props.long ]} >
        <div style={{}}>
        <Popup onClose={closePopup} style={{ maxWidth:"100", maxHeight:"auto" }} >
        {props.marker.name} <br />
        <a href={props.marker.url}> link </a>
        <video style={{ width:'300px' }} autoplay="true" src={props.marker.url}type="video/mp4" />
        </Popup>
        </div>
      </Marker>
      )
}

export default ApiMarker