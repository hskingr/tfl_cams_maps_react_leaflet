import React, { useState } from "react";
import { Marker, Popup, Icon } from 'react-leaflet'
import RoomIcon from '@mui/icons-material/Room';
import L from 'leaflet';
import { ZoomOut } from "@mui/icons-material";



function ApiMarker(props) {
  //for creating a offset on the y axis when a marker is clicked
  function recenter(map,latlng,offsetx,offsety) {
    const center = map.project(latlng);
    center = new L.point(center.x+offsetx,center.y+offsety);
    const target = map.unproject(center);
    map.panTo(target);
  }

  //function is called when the popup is closed
  function closePopup() {
    const point = props.map.layerPointToLatLng([0,0])
    const centerPoint = props.map.getSize().divideBy(2)
    const bounds = props.map.getBounds()
    console.log(props.map.getCenter())
    props.map.setView(props.map.getCenter(), 17,  { animate: true })
  }

  //event handler for clicking on marker
  function clicked(e) {
    props.map.setView(e.latlng, 18, { animate: true })
    const offset = props.map.getSize().y*0.2;
    props.map.panBy(new L.Point(0, -offset), {animate: false});
  }

  //this is where the marker is created for the map function in the main map component.
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