import React, { useState, useEffect } from "react";
import ApiMarker from "./ApiMarker";
import axios from "axios";
import { useMapEvent, MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

function AddMarkers(props) {

/*
useEffect(() => {
    getMarkers()
}, [props.refresh])
*/

function updateBounds() {
    const bounds = {
        "southWest": {
            "long": props.map.getBounds()._southWest.lng,
            "lat": props.map.getBounds()._southWest.lat
        },
        "northEast": {
            "long": props.map.getBounds()._northEast.lng,
            "lat": props.map.getBounds()._northEast.lat
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
            await props.newMarkers(await response.data)
            props.refreshFalse()
    } catch (error) {
        console.log(error)
    }
}

  return ( null)
}

export default AddMarkers