import { useContext } from "react";
import { Card, CardHeader, List } from '@mui/material';
import { UserContext } from "../context/user";
import AddProperty from "./AddProperty";
import Hero from './Hero';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Properties from './Properties';
import JobList from './JobList';

function Dashboard({ profile, userJobs, properties, addPropertyToList, addJob, deleteJob, editJob }) {
    const { user } = useContext(UserContext);

    const ctaFirst = ['Update Profile','/my-profile'];

    const propertiesContent = ( 
        <Grid item xs={12}>
            <CardHeader title={ "Properties" } />
            <List dense={ true }>
                <Properties properties={ properties } addJob={addJob} />
            </List>
        </Grid>
    );

    const jobsContent = ( 
        <Grid item xs={12}>
            <CardHeader title={ "Active Jobs" } />
            <List dense={ true }>
                <JobList jobs={ userJobs } deleteJob={ deleteJob } editJob={ editJob }/>
            </List>
        </Grid>
    );

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
                            { properties.length > 0 ? propertiesContent : null }
                            { userJobs.length > 0 ? jobsContent : null }
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )

};

export default Dashboard;
