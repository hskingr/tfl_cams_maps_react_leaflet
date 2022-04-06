import React from "react";
import { useMapEvent, MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

function ApiMarker(props) {

    // function doThing() {
    //     const map = useMap()
    //     console.log(map)
    // }

        const map = useMap()
        // console.log(map.getBounds())
      return (
        <Marker position={[51.505, -0.09]} >
        <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      )
}

export default ApiMarker