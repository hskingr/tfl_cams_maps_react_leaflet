import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { positions } from "@mui/system";
import { Box, Collapse } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Zoom from "@mui/material/Zoom";
import { Refresh } from "@mui/icons-material";
import ApiMarker from "./ApiMarker";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";

import {
  useMapEvent,
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

function RefreshMarkerButton(props) {
  const map = useMap();

  const [refresh, setRefresh] = useState(false);

  function updateBounds() {
    const bounds = {
      southWest: {
        long: map.getBounds()._southWest.lng,
        lat: map.getBounds()._southWest.lat,
      },
      northEast: {
        long: map.getBounds()._northEast.lng,
        lat: map.getBounds()._northEast.lat,
      },
    };
    return bounds;
  }

  async function getMarkers() {
    try {
      //gets markers my calling the webhook endpoints using axios
      // console.log("fetching markers");
      const body = updateBounds();
      // console.log(body);
      const username = process.env.REACT_APP_N8N_USER;
      const password = process.env.REACT_APP_N8N_PASSWORD;
      const url = process.env.REACT_APP_API_URL;
      const auth = {
        auth: {
          username,
          password,
        },
      };
      const response = await axios.get(url, {
        params: {
          ...body,
          headers: {},
          auth: {
            ...auth,
          },
        },
      });
      //returns results into an updated state for the map function to display.
      await props.setMarkers(await response.data);
      refreshFalse();
    } catch (error) {
      console.log(error);
    }
  }

  function refreshFalse() {
    setRefresh(false);
  }

  function clickedRefresh() {
    getMarkers();
    setRefresh(true);
  }

  return (
    <div>
      {/* This is a flexbox for the button components -- need to migrate to its own component file */}
      <Box sx={{ p: 2, right: 0, top: 0, zIndex: 5000, position: "absolute" }}>
        <Grid
          spacing={2}
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-end"
        >
          <Grid item xs={12} md={8}>
            <LoadingButton
              sx={{
                "&.Mui-disabled": {
                  "background-color": "#1976d2",
                },
              }}
              onClick={clickedRefresh}
              loading={refresh}
              loadingPosition="start"
              startIcon={<Refresh />}
              variant="contained"
            >
              Refresh
            </LoadingButton>
          </Grid>
          <Grid item xs={1} md={4}></Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default RefreshMarkerButton;
