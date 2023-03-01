import * as React from 'react';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader } from '@mui/material';
import PropertyCard from "./PropertyCard";
import CommentList from "./CommentList";
import JobItem from "./JobItem";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import DollarIcon from '@mui/icons-material/AttachMoney';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddComment from './AddComment';

function JobDetail() {
    const params = useParams();
    const id = params.id;
    const theme = createTheme();
    const [job, setJob] = useState(null);
    
    useEffect(() => {
        fetch(`/jobs/${id}`)
          .then((r) => r.json())
          .then((job) => setJob(job));
      }, []);

    // Show loading if job is null
    if(!job) { return <h2>Loading...</h2> }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={7} lg={7} > 
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <CardHeader title={ "Job Description" } />
                                <JobItem job={ job }/>
                            </Grid>
                            <Grid item xs={12}>
                                <CardHeader title={ "Property Location" } />
                                <PropertyCard
                                    to="/"
                                    icon={DollarIcon}
                                    title={ job.property.street_address }
                                    subtitle_one={ job.property.property_category + ' Property' }
                                    subtitle_two={ job.property.city_state }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CardHeader title={ "Comments" } />
                                <AddComment job={ job }/>
                                <CommentList comments={ job.job_comments } />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )

};

export default JobDetail;