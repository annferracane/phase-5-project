import { UserContext } from "../context/user";
import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Container, CardHeader, Grid, Stack } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';
import AddComment from './AddComment';
import CommentList from "./CommentList";
import JobItem from "./JobItem";
import PropertyCard from "./PropertyCard";

function JobDetail({ deleteJob, editJob }) {
    // State and other variables
    const { user } = useContext(UserContext);
    const params = useParams();
    const history = useHistory();
    const id = params.id;
    const [job, setJob] = useState(null);
    const [jobComments, setJobComments] = useState([]);
    const [jobLaborCategories, setJobLaborCategories] = useState([]);
    
    // Fetch job
    useEffect(() => {
        fetch(`/jobs/${id}`)
          .then((r) => r.json())
          .then((job) => {
            setJob(job);
            setJobComments(job.job_comments);
            setJobLaborCategories(job.labor_categories);
        });
      }, [id]);

    // Add job comment handler
    const addJobComment = (comment) => {
        setJobComments([...jobComments, comment]);
    }

    // Delete job comment handler
    const deleteJobComment = (id) => {
        const newJobComments = jobComments.filter(jobComment => jobComment.id !== id);
        setJobComments(newJobComments);
    }

    // Edit job detail handler
    const editJobDetailDisplay = (job, labor_categories) => {
        setJob(job);
        setJobLaborCategories(labor_categories);
    }

    // Show loading if job or jobComments are null
    if(!job || !jobComments ) { return <h2>Loading...</h2> }

    return (
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
                                icon={job.property.property_category === 'Residential' ? HomeIcon : BusinessIcon }
                                title={ job.property.street_address }
                                subtitle_one={ job.property.property_category + ' Property' }
                                subtitle_two={ job.property.city_state }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CardHeader title={ "Comments" } />
                            <Stack spacing={ 2 }>
                                { user ? <AddComment job={ job } addJobComment={ addJobComment }/> : <Button onClick={() => history.push('/login')}>Login to Post</Button> }
                                <CommentList comments={ jobComments } deleteJobComment={ deleteJobComment } />
                            </Stack>                            
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )

};

export default JobDetail;