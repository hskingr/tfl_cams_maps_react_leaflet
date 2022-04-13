import React, {useEffect} from 'react'
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Popper } from "@mui/material";


const PopupContent = (props) => {
    useEffect(() => {
        // Update the document title using the browser API
      }, []);





    const {name, closePopup, url} = props

    return (
        <Box>
        <Grid container rowSpacing={1} columnSpacing={0} alignItems="center">
          <Grid item xs={10}>
            <p> {name} </p>
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={closePopup}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <video
              style={{ width: "301px", height: 'auto'}}
              autoPlay={true}
              loop={true}
              controls={true}
              src={url}
              type="video/mp4"
            />
          </Grid>
        </Grid>
      </Box>
    )
}

export default PopupContent