import * as React from 'react';
// import Hero from './Hero';
// import JobCard from './SchoolCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function Jobs({ jobs }) {
    const ctaFirst = ['Submit A Job','/submit-a-job'];

    const jobCards = jobs.map(job => {
        return (
            <Grid item xs={12} md={3} lg={4} key={job.id} >
                <JobCard job={ job }/>
            </Grid>
        )
    } )

    // Show loading if jobs is null
  if(!jobs) { return <h2>Loading...</h2> }

    return (
        <>
            <Hero title="Jobs Needed" summary="All available jobs!" ctaFirst={ ctaFirst }/>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    { jobCards }
                </Grid>
            </Container>
        </>
    )

}

export default Schools;