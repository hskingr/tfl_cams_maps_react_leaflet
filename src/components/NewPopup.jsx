import React, { useState, useRef }  from "react";
import { Marker, Popup, Icon, useMap } from "react-leaflet";
import PopupContent from './PopupContent'

function NewPopup(props) {
  const popupRef = useRef()
  const map = useMap();


  //function is called when the popup is closed
  function closePopup() {
    console.log('closing')
    map.closePopup();
  }

  function panMap() {
    const popup = popupRef.current
    var px = map.project(popup._latlng); // find the pixel location on the map where the popup anchor is
    px.y -= popup._container.clientHeight/2; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
    map.panTo(map.unproject(px),{animate: true}); // pan to new center
  }

  return (
    <Popup
      ref={popupRef}
      className={"custom-popup"}
      id={0}
      keepInView={false}
      autoPan={false}
      onOpen={panMap}
      onClose={closePopup}
    >
    <PopupContent closePopup={closePopup} name={props.name} url={props.url}/>

    </Popup>
  );
}

export default NewPopup;
