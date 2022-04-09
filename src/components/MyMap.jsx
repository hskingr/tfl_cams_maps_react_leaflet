import React, { useState } from "react";
import ApiMarker from "./ApiMarker";
import { MapContainer, TileLayer } from 'react-leaflet'
import MovedMap from "./MovedMap";
import AddMarkers from "./AddMarkers";
import { Box, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import { Refresh } from '@mui/icons-material';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

import './myMap.css'


function MyMap() {

const [isReady, setReady] = useState(false)
const [bounds, SetBounds] = useState([])
const [map, setMap] = useState(null)
const [moved, setMoved] = useState(false)
const [refresh, setRefresh] = useState(false)
const [markers, setMarkers] = useState([])

function newMarkers(markers) {
setMarkers(markers)
}

function changeMoved() {
setMoved(true)
}

function clickedRefresh() {
setRefresh(true)
}

function refreshFalse() {
setRefresh(false)
}

function newBounds(boundData) {
    console.log(boundData)
SetBounds(boundData)
}

function makeReady(map) {
setMap(map)
setReady(true)
newBounds ( {
    "southWest": {
        "long": map.getBounds()._southWest.lng,
        "lat": map.getBounds()._southWest.lat
    },
    "northEast": {
        "long": map.getBounds()._northEast.lng,
        "lat": map.getBounds()._northEast.lat
    }
})
}

//used for tests

// const exampleMarker = {
//     "_id": "62517723e54cd01581acd3b6",
//     "name": "southwark-st-southwark-bdge-rd",
//     "url": "https://s3-eu-west-1.amazonaws.com/jamcams.tfl.gov.uk/00001.04214.mp4",
//     "timeDate": "2022-04-09T12-06-54-133Z",
//     "location": {
//         "type": "Point",
//         "coordinates": [
//             -0.09535,
//             51.5048
//         ]
//     }
// }

return (
<div style={{height: '100vh', width: '100vw'}}>

    <MapContainer whenCreated={makeReady} style={{ height: '100%', width: '100%'}} center={[51.505,-0.09]} zoom={16} maxZoom={30} >
        <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" />
        {/* detects map movement and updates bounds for database requests */}
        {<MovedMap boundData={newBounds} map={map} changeMoved={changeMoved} /> }
        {/* if the refresh button is pressed, add markers from database */}
        {refresh && <AddMarkers bounds={bounds} refresh={refresh} refreshFalse={refreshFalse} newMarkers={newMarkers} /> }
        {/* loads markers from state if any */}
        {markers.map(marker => {
        return (
            <div>
            {markers.map( (marker,index) => {
            console.log(marker)
            return <ApiMarker map={map} key={index} marker={marker} lat={marker.location.coordinates[1]} long={marker.location.coordinates[0]} />
            })}

        </div>

        )})}
        {/* used for examples */}
        {/* <ApiMarker map={map} key={200} marker={exampleMarker} lat={exampleMarker.location.coordinates[1]} long={exampleMarker.location.coordinates[0]} /> */}
    </MapContainer>
{/* This is a flexbox for the button components -- need to migrate to its own component file */}
      {<Box sx={{ p: 2, right: 0, top: 0, zIndex: 5000, position: 'absolute'}}>
      <Box rowSpacing={0} display='flex' container flex-wrap='wrap' direction="column" justifyContent="center" alignItems="flex-end">
          <Box sx={{flex: '50%'}} >
              {/* some logic is run to swap to a loading icon is the refresh button is pressed */}
          <Collapse in={!refresh} orientation='horizontal' >
                    <Zoom in={true}>
                        <Button startIcon={<Refresh />} onClick={clickedRefresh} sx={{
                                textAlign: 'center',
                                zIndex: 'modal',
                                marginLeft: "auto",
                                marginRight: "auto"
                                }} variant="contained" >
                            Refresh
                        </Button>
                    </Zoom>
                </Collapse>
          </Box>
          <Box sx={{flex: '50%'}} >
          <Collapse in={refresh} orientation='horizontal'>
                    {<CircularProgress
                        easing={{enter: 10, exit: 10}}
                        size={24}
                        thickness={8}
                        sx={{
                     }}
                />}
                </Collapse>
          </Box>
      </Box>
      </Box>}

</div>
)
}

export default MyMap