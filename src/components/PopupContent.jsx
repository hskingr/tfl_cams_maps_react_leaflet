import React, { useEffect } from "react";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Popper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import FileDownloadSharpIcon from "@mui/icons-material/FileDownloadSharp";
import LinkSharpIcon from '@mui/icons-material/LinkSharp';

const PopupContent = (props) => {
  useEffect(() => {
    // Update the document title using the browser API
  }, []);

  const { name, closePopup, url } = props;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="video"
        sx={{
          w: "1",
        }}
        alt={name}
        src={url}
        autoPlay={true}
        loop={true}
        controls={true}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
      <IconButton onClick={closePopup}>
          <FileDownloadSharpIcon />
        </IconButton>
        <IconButton onClick={url}>
          <LinkSharpIcon />
        </IconButton>
        <IconButton onClick={closePopup}>
          <CloseIcon />
        </IconButton>
      </CardActions>
    </Card>

    /*
    <Box>
      <Grid container rowSpacing={0} columnSpacing={0} alignItems="center">
        <Grid container rowSpacing={0} columnSpacing={0} alignItems="center">
          <Grid item xs={12} sx={{ padding: 0 }}>
            <video
              style={{ width: "301px", height: "auto" }}
              autoPlay={true}
              loop={true}
              controls={true}
              src={url}
              type="video/mp4"
            />
          </Grid>
        </Grid>
        <Grid container rowSpacing={2} columnSpacing={1} alignItems="center">
          <Grid item xs={10} sx={{ }}>
            <Typography variant="button"> {name} </Typography>
          </Grid>
          <Grid item xs={2} sx={{  }}>
            <IconButton onClick={closePopup}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
    */
  );
};

export default PopupContent;
