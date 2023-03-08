import { useState } from "react";
import { Marker } from '@react-google-maps/api';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import JobList from "./JobList";

function MapMarkerDialog({ property }) {
  // State and other variables
  const [open, setOpen] = useState(false);
  const [jobs] = useState(property ? property.jobs : []);
  const propLatLng = {lat: property.lat, lng: property.lng }

  // Handlers to open and close the map pin dialog box
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  // Show loading if property is null
  if(!property) { return <h2>Loading...</h2> }

  return (
    <div>
        <Marker 
            key={`prop-${property.id}`}
            position={ propLatLng }
            onClick={handleClickOpen}
         />
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{ property.street_address_1 }</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Check out the jobs available at this property!
                </DialogContentText>
                <JobList jobs={ jobs }/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}

export default MapMarkerDialog;