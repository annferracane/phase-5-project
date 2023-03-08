import { useContext, useState, useEffect } from "react";
import { Card, CardHeader, List } from '@mui/material';
import { UserContext } from "../context/user";
import { Container, Grid } from '@mui/material';
import AddProperty from "./AddProperty";
import Hero from './Hero';
import JobList from './JobList';
import Properties from './Properties';

function Dashboard({ profile, addPropertyToList, addJob, deleteJob, editJob, deletePropertyFromList, jobs, properties }) {
    // State and other variables
    const { user } = useContext(UserContext);
    const [userJobs, setUserJobs] = useState([]);
    const [userProperties, setUserProperties] = useState([]);
    const [errors, setErrors] = useState(null);

    // First button CTA
    const ctaFirst = ['Update Profile','/my-profile'];

    //Fetch user jobs
    useEffect(() => {
        fetch(`/users/${user.id}/jobs`)
        .then(res => {
          if(res.ok){
            res.json().then(setUserJobs)
          }else {
            res.json().then(data => setErrors(data.error))
          }
        })
      },[user, jobs]);

      // Fetch user properties
      useEffect(() => {
        fetch(`/users/${user.id}/properties`)
        .then(res => {
        if(res.ok){
            res.json().then(setUserProperties)
        }else {
            res.json().then(data => setErrors(data.error))
        }
        })
      },[user, properties]);

    // Array of styled properties
    const propertiesContent = ( 
        <Grid item xs={12}>
            <CardHeader title={ "Properties" } />
            <List dense={ true }>
                <Properties userProperties={ userProperties } addJob={addJob} deletePropertyFromList={deletePropertyFromList} />
            </List>
        </Grid>
    );

    // Array of styles jobs
    const jobsContent = ( 
        <Grid item xs={12}>
            <CardHeader title={ "Active Jobs" } />
            <List dense={ true }>
                <JobList jobs={ userJobs } deleteJob={ deleteJob } editJob={ editJob }/>
            </List>
        </Grid>
    );

    // Load server errors if present 
    if(errors) return <h1>{errors}</h1>
    
    // Return loading if user null
    if(!user) { return <h2>Loading...</h2> }

    return (
        <>
            <Hero title={profile ? `${profile.first_name}'s JINDAH` : 'My JINDAH'} summary="Add properties and jobs to be done!" ctaFirst={ ctaFirst }/>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={5} lg={5} > 
                        <Grid item xs={12}>
                            <CardHeader title={ "Add a Property" } />
                            <Card sx={{ flex: 1 }}>
                                <AddProperty addPropertyToList={addPropertyToList}/>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={7} lg={7} > 
                        <Grid container spacing={3}>
                            { userProperties.length > 0 ? propertiesContent : null }
                            { userJobs.length > 0 ? jobsContent : null }
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )

};

export default Dashboard;
