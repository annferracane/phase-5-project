import { useState, useEffect } from "react";
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ActionAlerts from './ActionAlerts';
import LaborTags from './LaborTags';

function AddJobDialog({ property, addJob }) {
  // State and other variables
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState();
  const [alertMessages, setAlertMessages] = useState([]);
  const [laborCategories, setLaborCategories] = useState([]);

  const timelines = ['ASAP', 'Within the week', 'Within the month', 'Within 3 months', 'Within 6 months', 'Seeking Input / Not Urgent'];
  const timelineArray = timelines.map(timeline => <MenuItem key={timeline} value={timeline}>{timeline}</MenuItem>)
  const [formData, setFormData] = useState({
      title: '',
      description: '',
      timeline: '',
      labor_categories: []
    });
    
  const { title, description, timeline, labor_categories} = formData;

  // Fetches labor categories for tags in autocomplete 
  useEffect(() => {
    fetch("/labor_categories")
      .then((res) => res.json())
      .then((labor_categories) => setLaborCategories(labor_categories));
  }, []);

  // Handles dialog open
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Handles dialog close
  const handleClose = () => {
    setOpen(false);
  };

  // Handles deletion of labor category tag
  const deleteLaborTag = (laborTagToDelete) => {
    const newLaborTags = labor_categories.filter(laborTag => laborTag.id !== laborTagToDelete.id);
    setFormData({ ...formData, labor_categories: newLaborTags });
  }

  // Handles change of labor category autocomplete
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

  // Handles other form changes with states
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  // Handles form submit
  const handleSubmit = (e) => {
      e.preventDefault();

      if(labor_categories.length > 0) {
        const job = {
          title: title,
          description: description,
          timeline: timeline,
          is_accepted: false,
          is_completed: false,
          property_id: property.id,
          contractor_profile_id: null
      };
      
      fetch(`/properties/${property.id}/jobs`, {
        method: 'POST', 
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(job)
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
                  setFormData({
                    title: '',
                    description: '',
                    timeline: '',
                    is_accepted: false,
                    is_completed: false,
                    labor_categories: []
                  });
                  handleClose();
                })
                .then(addJob(job))
              })
          } else {
              res.json().then(json => {
                setSeverity("error");
                setAlertMessages(Object.entries(json.errors));
            });
          }
       })
      } else {
        setSeverity("error");
        setAlertMessages([[0, "A job requires at least 1 job category."]]);
      }
    };
  
  // Show loading if laborCategories is null
  if(!laborCategories) { return <h2>Loading...</h2> }

  return (
    <div>
      <Button variant="outlined" color="success" onClick={handleClickOpen} startIcon={<AddCircleIcon />}>
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
          <Button onClick={handleSubmit}>Add Job</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddJobDialog;