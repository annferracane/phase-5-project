//Consolidate
import { useState } from "react";
import { Marker } from '@react-google-maps/api';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import JobList from "./JobList";

function MapMarkerDialog({ property }) {
    const [open, setOpen] = useState(false);
    const [jobs, setJobs] = useState(property ? property.jobs : []);

    const propLatLng = {lat: property.lat, lng: property.lng }

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