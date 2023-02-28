import * as React from 'react';
import { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom"
import { UserContext } from "../context/user";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ActionAlerts from './ActionAlerts';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Hero from './Hero';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

function SubmitJob({ laborCategories }) {
    const params = useParams();
    const { user, setUser } = useContext(UserContext);
    const [severity, setSeverity] = useState();
    const [alertMessages, setAlertMessages] = useState([]);
    const theme = createTheme();
    const history = useHistory();

    const ctaFirst = ['See Jobs Needed','/jobs-needed'];

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
          property_id: params.id,
          contractor_profile_id: null,
          labor_category_id: labor_category_id // need to do
      };
    
      fetch(`/properties/${params.id}/jobs`,{ // to do (from params) - is this URL needed?
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
                  history.push(`/properties/${params.id}/jobs/${job.id}`); // revisit
              })
          }else {
              res.json().then(json => {
                setSeverity("error");
                setAlertMessages(Object.entries(json.errors));
            });
          }
      })
      };


    return (
        <>
            <Hero title="Submit a Job" summary="Submit a job! Get it done." ctaFirst={ ctaFirst }/>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                    <ActionAlerts messages={alertMessages} severity={severity}/>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Submit Job
                        </Button>
                    </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>

    )

}

export default SubmitJob;