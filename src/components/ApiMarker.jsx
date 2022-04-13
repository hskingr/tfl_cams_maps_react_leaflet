import React, { useState, useRef } from "react";
import { Marker, Popup, Icon, useMap } from "react-leaflet";
import RoomIcon from "@mui/icons-material/Room";
import L from "leaflet";
import { ZoomOut } from "@mui/icons-material";
import NewPopup from "./NewPopup";
import icon from "./pin.svg"

function ApiMarker(props) {
  const [markerClicked, setMarkerClicked] = useState(false);
  let map = useMap();
  const lat = props.marker.location.coordinates[1];
  const long = props.marker.location.coordinates[0];
  const { name, url } = props.marker;

  //event handler for clicking on marker
  function clicked(e) {
    // console.log(e);
  }

  const myIcon = L.icon({
    iconUrl: icon,
  });

  //this is where the marker is created for the map function in the main map component.
  return (
    <Marker
      icon={myIcon}
      eventHandlers={{
        click: (e) => {
          clicked(e);
          // setMarkerClicked(true)
        },
      }}
      position={[lat, long]}
    >
      <NewPopup name={name} url={url} />
    </Marker>
  );
}

export default ApiMarker;
