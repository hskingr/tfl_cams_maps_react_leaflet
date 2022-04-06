import React, { useState } from "react";
import MapEventExample from "./MapEventExample";
import ApiMarker from "./ApiMarker";
import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { useMapEvent, MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

function MyMap() {
    const [isReady, setIsReady] = useState(false)
    const [markers, setMarkers] = useState({}); // Array instead of object

    async function getMarkers() {
        try {
            const body = {
                "southWest": {
                    "long": -0.08325576782226562,
                    "lat": 51.491110246849814
                },
                "northEast": {
                    "long": -0.04497528076171874,
                    "lat": 51.47053071051183
                }
             }
            const username = "harry"
            const password = "x@xnEH$X5MFhq7"
            const headers ={ headers: {
                }}
            const auth = {
                auth: {
                    username, password
                }
            }
            const method = {method: 'get'}
            const config = {
                ...headers,
                ...auth,
                ...method,
                params: body
            }
            console.log(config)


        //   const res = await axios.get(`https://n8n.libraryoftype.xyz/webhook/getBounds`)

            const response = await axios.get('https://n8n.libraryoftype.xyz/webhook-test/getBounds', {
                params: {
                    ...body
                }
            });
            console.log(response);

            // const x = await axios({
            //     url: 'https://dog.ceo/api/breeds/list/all',



            //     method: 'get',
            //     auth: {
            //         username, password
            //     },
            //     body


            //   })
            //   console.log(x)

        } catch (error) {
            console.log(error)
        }

    }


    function changeReady() {
        setIsReady(true)
    }

    return (
        <MapContainer whenReady={getMarkers} style={{height: 800, width: 800}} center={[51.505, -0.09]} zoom={13}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {console.log(markers)}
           <Marker position={[51.505, -0.01]} >
             <Popup>
             A pretty CSS3 popup. <br /> Easily customizable.
             </Popup>
           </Marker>
            {/* <ApiMarker /> */}
           changeReady && <ApiMarker />
     </MapContainer>
    )
}

export default MyMap