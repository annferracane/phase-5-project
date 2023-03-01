import * as React from 'react';
import { Card, CardHeader, List } from '@mui/material';
import AddProperty from "./AddProperty";
import Hero from './Hero';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Properties from './Properties';
import JobList from './JobList';

function Dashboard({ userJobs, properties, addPropertyToList, addJobToList }) {

    const ctaFirst = ['Add a Property','/add-a-property'];

    return (
        <>
            <Hero title="My Dashboard" summary="This is my dashboard!" ctaFirst={ ctaFirst }/>
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
                            <Grid item xs={12}>
                                <CardHeader title={ "Properties" } />
                                <Card sx={{ flex: 1 }}>
                                    <List dense={ true }>
                                        <Properties properties={ properties } addJobToList={addJobToList} />
                                    </List>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <CardHeader title={ "Jobs" } />
                                <Card sx={{ flex: 1 }}>
                                    <List dense={ true }>
                                        <JobList jobs={ userJobs } />
                                    </List>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )

};

export default Dashboard;
