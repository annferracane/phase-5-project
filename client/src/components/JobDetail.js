import * as React from 'react';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CardHeader } from '@mui/material';
import PropertyCard from "./PropertyCard";
import CommentList from "./CommentList";
import JobItem from "./JobItem";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import DollarIcon from '@mui/icons-material/AttachMoney';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddComment from './AddComment';

function JobDetail({ deleteJob, editJob }) {
    const params = useParams();
    const id = params.id;
    const theme = createTheme();
    const [job, setJob] = useState(null);
    const [jobComments, setJobComments] = useState([]);
    const [jobLaborCategories, setJobLaborCategories] = useState([]);
    
    useEffect(() => {
        fetch(`/jobs/${id}`)
          .then((r) => r.json())
          .then((job) => {
            setJob(job);
            setJobComments(job.job_comments);
            setJobLaborCategories(job.labor_categories);
        });
      }, []);

      const addJobComment = (comment) => {
        setJobComments([...jobComments, comment]);
      }
    
      const deleteJobComment = (id) => {
          const newJobComments = jobComments.filter(jobComment => jobComment.id !== id);
          setJobComments(newJobComments);
      }

      const editJobDetailDisplay = (job, labor_categories) => {
        setJob(job);
        setJobLaborCategories(labor_categories);
      }

    // Show loading if job is null
    if(!job || !jobComments ) { return <h2>Loading...</h2> }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={7} lg={7} > 
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <CardHeader title={ "Job Description" } />
                                <JobItem job={ job } jobLaborCategories={ jobLaborCategories } deleteJob={ deleteJob } editJob={ editJob } editJobDetailDisplay={ editJobDetailDisplay } hideSeeJobButton={ true }/>
                            </Grid>
                            <Grid item xs={12}>
                                <CardHeader title={ "Property Location" } />
                                <PropertyCard
                                    to={`/property/${job.property.id}`}
                                    icon={DollarIcon}
                                    title={ job.property.street_address }
                                    subtitle_one={ job.property.property_category + ' Property' }
                                    subtitle_two={ job.property.city_state }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CardHeader title={ "Comments" } />
                                <AddComment job={ job } addJobComment={ addJobComment }/>
                                <CommentList comments={ jobComments } deleteJobComment={ deleteJobComment } />
                            </Grid>
                        </Grid>
                    </Grid>
                    
                </Grid>
            </Container>
        </ThemeProvider>
    )

};

export default JobDetail;