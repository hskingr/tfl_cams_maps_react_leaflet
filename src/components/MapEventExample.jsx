import React from "react";
import { useMapEvent, MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

function MapEventExample() {
    const map = useMapEvent('load', () => {
        // map.setCenter([50.5, 30.5])
        console.log('hey')
      })

      return (
          <div eventHandlers={{
            load: () => {
                console.log('loaded')
            },
        }} />
      )
}

export default MapEventExample