import JobItem from './JobItem';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function Jobs({ jobs, addJob, releaseJob, deleteJob, editJob, contractorProfile, editJobDetailDisplay }) {
    // Job cards to render if user is not a contractor
    const jobCards = jobs.map(job => {
        return (
            <Grid item xs={12} key={job.id} >
                <JobItem job={ job } jobLaborCategories={ job.labor_categories } deleteJob={ deleteJob } editJob={ editJob } editJobDetailDisplay={ editJobDetailDisplay } />
            </Grid>
        )
    });

    // Job cards to render if user is a contractor
    const contractorJobCards = jobs.map(job => {
        return (
            <Grid item xs={12} key={job.id} >
                <JobItem job={ job } jobLaborCategories={ job.labor_categories } contractorProfile={ contractorProfile } deleteJob={ deleteJob } addJob={ addJob } releaseJob={ releaseJob } />
            </Grid>
        )
    });

    // Show loading if jobs is null
   if(!jobs) { return <h2>Loading...</h2> }

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                { contractorProfile ? contractorJobCards : jobCards }
            </Grid>
        </Container>
    )
};

export default Jobs;