import React, { useEffect, useState } from "react";
import { useMapEvent, useMapEvents } from "react-leaflet";

//this component updates the bounds of the view everytime the map is dragged
function MovedMap(props) {
    const map = useMapEvent({
        dragend() {
            props.changeMoved()
                  const  bounds = {
            "southWest": {
                "long": map.getBounds()._southWest.lng,
                "lat": map.getBounds()._southWest.lat
            },
            "northEast": {
                "long": map.getBounds()._northEast.lng,
                "lat": map.getBounds()._northEast.lat
            }
         }
         props.boundData(bounds)
        }
      })
return null
}

export default MovedMap