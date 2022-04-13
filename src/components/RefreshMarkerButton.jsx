import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { positions } from '@mui/system';
import { Box, Collapse } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Zoom from '@mui/material/Zoom';
import { Refresh } from '@mui/icons-material';
import ApiMarker from "./ApiMarker";
import axios from "axios";
import { useMapEvent, MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'


function RefreshMarkerButton(props) {

    const map = useMap()

    const [refresh, setRefresh] = useState(false)

    function updateBounds() {
        const bounds = {
            "southWest": {
                "long": map.getBounds()._southWest.lng,
                "lat": map.getBounds()._southWest.lat
            },
            "northEast": {
                "long": map.getBounds()._northEast.lng,
                "lat": map.getBounds()._northEast.lat
            }
        }
        return bounds
    }

    async function getMarkers() {
        try {
            //gets markers my calling the webhook endpoints using axios
                console.log('fetching markers')
                const body = updateBounds()
                const username = process.env.REACT_APP_N8N_USER
                const password = process.env.REACT_APP_N8N_PASSWORD
                const auth = {
                    auth: {
                        username, password
                    }
                }
                const response = await axios.get('https://n8n.libraryoftype.xyz/webhook/getBounds', {
                    params: {
                        ...body,
                        headers: {

                        },
                        auth: {
                            ...auth
                        }
                    }
                });
                //returns results into an updated state for the map function to display.
                await props.setMarkers(await response.data)
                refreshFalse()
        } catch (error) {
            console.log(error)
        }
    }

    function refreshFalse() {
        setRefresh(false)
    }


    function clickedRefresh() {
        getMarkers()
        setRefresh(true)
    }

return (
<div>
    {/* This is a flexbox for the button components -- need to migrate to its own component file */}
    <Box sx={{ p: 2, right: 0, top: 0, zIndex: 5000, position: 'absolute'}}>
    <Box rowSpacing={0} display='flex' container flex-wrap='wrap' direction="column" justifyContent="center" alignItems="flex-end">
        <Box sx={{flex: '50%'}} >
            {/* some logic is run to swap to a loading icon is the refresh button is pressed */}
        <Collapse in={!refresh} orientation='horizontal' >
                  <Zoom in={true}>
                      <Button startIcon={<Refresh />}
                              onClick={clickedRefresh}
                              sx={{
                                  textAlign: 'center',
                                  zIndex: 'modal',
                                  marginLeft: "auto",
                                  marginRight: "auto"
                              }}
                              variant="contained" >
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
    </Box>
</div>
)

}

export default RefreshMarkerButton