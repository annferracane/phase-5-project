import JobItem from './JobItem';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function Jobs({ jobs, deleteJob, editJob, contractorProfile }) {

    const jobCards = jobs.map(job => {
        return (
            <Grid item xs={12} key={job.id} >
                <JobItem job={ job } jobLaborCategories={ job.labor_categories } deleteJob={ deleteJob } editJob={ editJob } />
            </Grid>
        )
    } )

    const contractorJobCards = jobs.map(job => {
        return (
            <Grid item xs={12} key={job.id} >
                <JobItem job={ job } jobLaborCategories={ job.labor_categories } contractorProfile={ contractorProfile } />
            </Grid>
        )
    } )

    // Show loading if jobs is null
   if(!jobs) { return <h2>Loading...</h2> }

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                { contractorProfile ? contractorJobCards : jobCards }
            </Grid>
        </Container>
    )

}

export default Jobs;