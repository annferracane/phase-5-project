import * as React from 'react';
//Consolidate
import { useState, useContext, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { UserContext } from "../context/user";
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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function AddJobDialog({ property }) {
    const { user, setUser } = useContext(UserContext); // ?
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = useState();
    const [alertMessages, setAlertMessages] = useState([]);
    const [laborCategories, setLaborCategories] = useState([]);
    const history = useHistory(); //?
  
    useEffect(() => {
      fetch("/labor_categories")
        .then((res) => res.json())
        .then((labor_categories) => setLaborCategories(labor_categories));
    }, []);

    const timelines = ['ASAP', 'Within the week', 'Within the month', 'Within 3 months', 'Within 6 months', 'Seeking Input / Not Urgent'];
    const timelineArray = timelines.map(timeline => <MenuItem key={timeline} value={timeline}>{timeline}</MenuItem>)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        timeline: '',
        labor_category: '',
        labor_category_id: null
      });
      
    const { title, description, timeline, labor_category_id } = formData;

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleLaborCategoryChange = (value) => {
        if(value != null ) {
            fetch(`/labor-category-lookup/${value}`)
            .then(res => {
                if(res.ok){
                    res.json().then(labor_category_id => {
                        setFormData({ ...formData, ["labor_category_id"]: labor_category_id });
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
      
      const job = {
        title: title,
        description: description,
        timeline: timeline,
        is_accepted: null,
        is_completed: null,
        property_id: property.id,
        contractor_profile_id: null,
        labor_category_id: labor_category_id // need to do
    };
  
    fetch(`/properties/${property.id}/jobs`, {
      method: 'POST', 
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify(job)
    })
    .then(res => {
        if(res.ok){
            res.json().then(job => {
              setFormData({
                  title: '',
                  description: '',
                  timeline: '',
                  is_accepted: false,
                  is_completed: false,
                  labor_category: '',
                  labor_category_id: null
                });

                // Need to update state of dashboard jobs list if not pushing
                handleClose();
            })
        }else {
            res.json().then(json => {
              setSeverity("error");
              setAlertMessages(Object.entries(json.errors));
          });
        }
    })
    };
  
     // Show loading if jobs is null
   if(!laborCategories) { return <h2>Loading...</h2> }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Job
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Job</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new job to this property, fill out the job details below!
          </DialogContentText>
          <ActionAlerts messages={alertMessages} severity={severity}/>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Autocomplete
                  onChange={(event, value) => handleLaborCategoryChange(value)}
                  id="laborCategoryName"
                  freeSolo
                  name="laborCategoryName"
                  options={laborCategories.map((laborCategory) => laborCategory.name )}
                  renderInput={(params) => <TextField {...params} label="Job Category" />}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="timeline-label">Timeline</InputLabel>
                <Select
                    labelId="timeline-label"
                    id="timeline"
                    name="timeline"
                    label="Timeline"
                    value={ timeline }
                    onChange={ handleChange }
                >   
                    { timelineArray }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="title"
                label="Job Title"
                name="title"
                autoComplete="title"
                value={ title }
                onChange={ handleChange }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="description"
                name="description"
                required
                fullWidth
                multiline
                rows={4}
                id="description"
                label="Job Description"
                value={ description }
                onChange={ handleChange }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Job</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}