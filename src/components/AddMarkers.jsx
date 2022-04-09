import React, { useState, useEffect } from "react";
import ApiMarker from "./ApiMarker";
import axios from "axios";
import { useMapEvent, MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

function AddMarkers(props) {

useEffect(() => {
    getMarkers()
}, [props.refresh])

  async function getMarkers() {
    try {
            console.log('fetching markers')
            const body = props.bounds
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
            await props.newMarkers(await response.data)
            props.refreshFalse()
    } catch (error) {
        console.log(error)
    }
}

  return ( null )
}

export default AddMarkers