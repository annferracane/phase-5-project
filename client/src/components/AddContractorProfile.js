//Consolidate
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/user";
import { useHistory } from 'react-router-dom';
import ActionAlerts from './ActionAlerts';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Grid from '@mui/material/Grid';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import LaborTags from './LaborTags';

function AddContractorProfile({ updateContractorProfile }) {
    const { user } = useContext(UserContext); 
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState();
    const [alertMessages, setAlertMessages] = useState([]);
    const [laborCategories, setLaborCategories] = useState([]);
    const history = useHistory();
  
    useEffect(() => {
      fetch("/labor_categories")
        .then((res) => res.json())
        .then((labor_categories) => setLaborCategories(labor_categories));
    }, []);

    const distances = [10, 25, 50, 100, 250, 300, 500];
    const distanceArray = distances.map(distance => <MenuItem key={`distance-${distance}`} value={`${distance}`}>{ distance }</MenuItem>)

    const [formData, setFormData] = useState({
        zip: '',
        travel_radius_miles: '',
        labor_categories: []
      });
      
    const { zip, travel_radius_miles, labor_categories} = formData;

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const deleteLaborTag = (laborTagToDelete) => {
      const newLaborTags = labor_categories.filter(laborTag => laborTag.id !== laborTagToDelete.id);
      setFormData({ ...formData, labor_categories: newLaborTags });
    }

    const handleLaborCategoryChange = (value) => {
      if(value != null ) {
            fetch(`/labor-category-lookup/${value}`)
            .then(res => {
                if(res.ok){
                    res.json().then(labor_category_id => {
                        const laborObj = {
                          id: labor_category_id,
                          name: value
                        }
                        const newLaborTags = [...labor_categories, laborObj];
                        setFormData({ ...formData, labor_categories: newLaborTags });
                    })
                } else {
                    res.json().then(json => console(Object.entries(json.errors)));
                }
            })
        }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      
      const contractorProfile = {
        zip: zip,
        travel_radius_miles: travel_radius_miles,
        user_id: user.id
    };
    
    fetch(`/contractor-profile`, {
      method: 'POST', 
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify(contractorProfile)
    })
    .then(res => {
        if(res.ok){
            res.json().then(user => {
              Promise.all(
                labor_categories.map(labor_category => {
                  return new Promise((resolve) => {

                    const contractorSpecialty = {
                        contractor_profile_id: user.contractor_profile.id,
                        labor_category_id: labor_category.id
                    };

                    fetch(`/contractor_specialties`, {
                      method: 'POST', 
                      headers:{'Content-Type': 'application/json'},
                      body:JSON.stringify(contractorSpecialty)
                    })
                    .then(res => {
                      if(res.ok){
                        return new Promise(() => {
                          res.json().then(labor_category => {
                            console.log(labor_category);
                            resolve();
                          })
                        })
                      } else {
                        console.log("Error: contractor speciality categories POST")
                      }

                    })
                  })
                })
              )
              .then(() => {
                console.log("Contractor specialities added to contractor profile.");

                setFormData({
                  zip: '',
                  travel_radius_miles: '',
                  labor_categories: []
                });
              })
              .then(updateContractorProfile(user))
              .then(handleClose())
              .then(history.push(`/jobs-needed`))
            })
        } else {
            res.json().then(json => {
              setSeverity("error");
              setAlertMessages(Object.entries(json.errors));
          });
        }
    })
    };
  
  // Show loading if laborCategories is null
  if(!laborCategories) { return <h2>Loading...</h2> }

  return (
    <div>
        <MenuItem onClick={handleClickOpen}>
            <Typography textAlign="center">Become a Contractor</Typography>
        </MenuItem>
      {/* <Button variant="outlined" color="success" onClick={handleClickOpen} startIcon={<AddCircleIcon />}>
        Add Job
      </Button> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a Contractor Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To become a JINDAH contractor, fill out the profile below.
          </DialogContentText>
          <ActionAlerts messages={alertMessages} severity={severity}/>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Autocomplete
                  required
                  onChange={(event, value) => handleLaborCategoryChange(value)}
                  id="laborCategoryName"
                  freeSolo
                  name="laborCategoryName"
                  options={laborCategories.map((laborCategory) => laborCategory.name )}
                  renderInput={(params) => <TextField {...params} label="Contractor Specialties" />}
              />
            </Grid>
            { labor_categories ? <Grid item xs={12}><LaborTags laborTags={labor_categories} deleteLaborTag={ deleteLaborTag } /></Grid> : null } 
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="zip"
                label="Your 5-Digit Zipcode"
                name="zip"
                autoComplete="zip"
                value={ zip }
                onChange={ handleChange }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="travel_radius_miles-label">Preferred Travel Radius (miles)</InputLabel>
                <Select
                    labelId="travel_radius_miles-label"
                    id="travel_radius_miles"
                    name="travel_radius_miles"
                    label="Miles"
                    value={ travel_radius_miles }
                    onChange={ handleChange }
                >   
                    { distanceArray }
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create Profile</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddContractorProfile;