import React, { useState, useEffect } from "react";
import ApiMarker from "./ApiMarker";
import { positions } from '@mui/system';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { map } from "leaflet";
import MovedMap from "./MovedMap";
import AddMarkers from "./AddMarkers";
import { spacing } from '@mui/system';
import { Container, Box, Grid, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import { flexbox } from '@mui/system';
import Zoom from '@mui/material/Zoom';
import { Refresh, AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';

import './myMap.css'


function MyMap() {

const [isReady, setReady] = useState(false)
const [bounds, SetBounds] = useState([])
const [map, setMap] = useState(null)
const [moved, setMoved] = useState(false)
const [refresh, setRefresh] = useState(false)
const [markers, setMarkers] = useState([])
const [isLoading, setIsLoading] = useState(false)

function newMarkers(markers) {
setMarkers(markers)
}

function loading() {
setIsLoading(!isLoading)
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



const Item = styled(Paper)(({ theme }) => ({
backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
...theme.typography.body2,
padding: theme.spacing(1),
textAlign: 'center',
color: theme.palette.text.secondary,
}));

return (
<div style={{height: '100vh', width: '100vw'}}>

    <MapContainer whenCreated={makeReady} style={{ height: '100%', width: '100%'}} center={[51.505,
        -0.09]} zoom={16}>
        <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" />
        {<MovedMap boundData={newBounds} map={map} changeMoved={changeMoved} /> }
        {refresh && <AddMarkers bounds={bounds} refresh={refresh} refreshFalse={refreshFalse} newMarkers={newMarkers} /> }
        {markers.map(marker => {
        return ( <div>
            {markers.map( (marker,index) => {
            console.log(marker)
            return <ApiMarker map={map} key={index} marker={marker} lat={marker.location.coordinates[1]} long={marker.location.coordinates[0]} />
            })}
        </div>
        )})}
    </MapContainer>

    <Box sx={{ p: 2, right: 0, top: 0, zIndex: 5000, position: 'absolute'}}>
        <Grid rowSpacing={5} container direction="column" justifyContent="center" alignItems="flex-end">
            <Grid item xs={3}>
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

<Collapse in={refresh} >
{<CircularProgress
            size={24}
            sx={{
              color: green[500],
            }}
             />}
</Collapse>
            </Grid>
            <Grid item xs={3}>

            </Grid>
            <Grid item xs={3}>

            </Grid>
            <Grid item xs={3}>

            </Grid>
            <Grid item xs={4}>

            </Grid>
            <Grid item xs={8}>

            </Grid>
        </Grid>
    </Box>




</div>
)
}

export default MyMap