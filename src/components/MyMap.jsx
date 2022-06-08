import React, { useState } from "react";
import ApiMarker from "./ApiMarker";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import MovedMap from "./MovedMap";
import AddMarkers from "./AddMarkers";
import { Box, Collapse } from "@mui/material";
import { styled } from "@mui/material/styles";

import { Buttn } from "@mui/material";
import Paper from "@mui/material/Paper";
import RefreshButton from "./RefreshMarkerButton";

import "./myMap.css";
import RefreshMarkerButton from "./RefreshMarkerButton";

function MyMap() {
  const [isReady, setReady] = useState(false);
  const [bounds, SetBounds] = useState([]);
  const [map, setMap] = useState(null);

  const [markers, setMarkers] = useState([]);

  function newMarkers(markers) {
    setMarkers(markers);
  }

  function newBounds(boundData) {
    SetBounds(boundData);
  }

  function makeReady(map) {
    setMap(map);
    setReady(true);
    //formatted for Mongo query
    //do I need this???
    // newBounds ( {
    //     "southWest": {
    //         "long": map.getBounds()._southWest.lng,
    //         "lat": map.getBounds()._southWest.lat
    //     },
    //     "northEast": {
    //         "long": map.getBounds()._northEast.lng,
    //         "lat": map.getBounds()._northEast.lat
    //     }
    // })
  }

  //used for tests

  const exampleMarker = {
    _id: "62517723e54cd01581acd3b6",
    name: "southwark-st-southwark-bdge-rd",
    url: "https://s3-eu-west-1.amazonaws.com/jamcams.tfl.gov.uk/00001.04214.mp4",
    timeDate: "2022-04-09T12-06-54-133Z",
    location: {
      type: "Point",
      coordinates: [-0.09535, 51.5048],
    },
  };
  // const exampleMarker2 = {
  //     "_id": "62517723e54cd01581acd3b6",
  //     "name": "southwark-st-southwark-bdge-rd",
  //     "url": "https://s3-eu-west-1.amazonaws.com/jamcams.tfl.gov.uk/00001.04214.mp4",
  //     "timeDate": "2022-04-09T12-06-54-133Z",
  //     "location": {
  //         "type": "Point",
  //         "coordinates": [
  //             0,
  //             0
  //         ]
  //     }
  // }

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer
        whenCreated={makeReady}
        style={{ height: "100%", width: "100%" }}
        center={[51.505, -0.09]}
        zoom={16}
        maxZoom={30}
      >
        <TileLayer
          url="https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}"
          accessToken={process.env.REACT_APP_TILE_ACCESS}
        />
        {/* detects map movement and updates bounds for database requests  */}
        <MovedMap boundData={newBounds} map={map} />
        {/* if the refresh button is pressed, add markers from database */}
        {/* loads markers from state if any */}

        {markers.map((marker, index) => {
          // console.log(marker._id);

          return (
            <ApiMarker
              map={map}
              key={index}
              marker={marker}
              lat={marker.location.coordinates[1]}
              long={marker.location.coordinates[0]}
            />
          );
        })}

        {/* used for examples */}
        <ApiMarker key={200} marker={exampleMarker} />
        {/* {isReady &&  <Marker key={201} position={map.layerPointToLatLng([0,0])} /> } */}
        {/* {isReady &&  <Marker key={202} position={map.layerPointToLatLng([(map.getSize().x/2), map.getSize().y])} /> } */}
        <RefreshMarkerButton setMarkers={setMarkers} />
      </MapContainer>
    </div>
  );
}

export default MyMap;
