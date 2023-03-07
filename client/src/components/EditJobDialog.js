import { useState, useEffect } from "react";
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
import EditIcon from '@mui/icons-material/Edit';

import LaborTags from './LaborTags';

function EditJobDialog({ job, editJob, editJobDetailDisplay }) {
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState();
    const [alertMessages, setAlertMessages] = useState([]);
    const [laborCategories, setLaborCategories] = useState([]);
  
    useEffect(() => {
      fetch("/labor_categories")
        .then((res) => res.json())
        .then((labor_categories) => setLaborCategories(labor_categories));
    }, []);

    const timelines = ['ASAP', 'Within the week', 'Within the month', 'Within 3 months', 'Within 6 months', 'Seeking Input / Not Urgent'];
    const timelineArray = timelines.map(timeline => <MenuItem key={timeline} value={timeline}>{timeline}</MenuItem>)

    const [formData, setFormData] = useState({
        title: job.title,
        description: job.description,
        timeline: job.timeline,
        labor_categories: job.labor_categories
      });
      
    const { title, description, timeline, labor_categories} = formData;

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
      
      const jobUpdate = {
        title: title,
        description: description,
        timeline: timeline
    };
    
    fetch(`/jobs/${job.id}`, {
      method: 'PATCH', 
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify(jobUpdate)
    })
    .then(res => { 
        if(res.ok){ 
            fetch(`/delete-labor-categories/${job.id}`, {
                method: 'DELETE',
                headers:{'Content-Type': 'application/json'}
            })
            .then(res => {
                if(res.ok){
                    res.json().then(job => {
                      Promise.all(
                        labor_categories.map(labor_category => {
                          return new Promise((resolve) => {
        
                            const jobLaborCategory = {
                              job_id: job.id,
                              labor_category_id: labor_category.id
                            };
        
                            fetch(`/job_labor_categories`, {
                              method: 'POST', 
                              headers:{'Content-Type': 'application/json'},
                              body:JSON.stringify(jobLaborCategory)
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
                                console.log("Error: job labor categories POST")
                              }
                            })
                          })
                        })
                      )
                      .then(() => {
                        console.log("Job labor categories added to job.");
                        handleClose();
                      })
                      .then(editJob(job))
                      .then(editJobDetailDisplay(job, labor_categories))
                    })
                } else {
                    res.json().then(json => {
                      setSeverity("error");
                      setAlertMessages(Object.entries(json.errors));
                  });
                }
            })
        } else {
            console.log("Error: job labor categories POST")
        }
    })
    };
  
  // Show loading if jobs is null
  if(!laborCategories) { return <h2>Loading...</h2> }

  return (
    <div>
      <Button variant="outlined" color="secondary" startIcon={<EditIcon />} onClick={handleClickOpen}>
        Edit Job
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Job</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Job details can be edited here. Be sure to be descriptive!
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
                  renderInput={(params) => <TextField {...params} label="Job Category" />}
              />
            </Grid>
            { labor_categories ? <Grid item xs={12}><LaborTags laborTags={labor_categories} deleteLaborTag={ deleteLaborTag } /></Grid> : null } 
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
          <Button onClick={handleSubmit}>Save Edits</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditJobDialog;