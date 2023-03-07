import { useContext } from "react";
import { UserContext } from "../context/user";
import { Box, Container } from '@mui/material';
import Hero from './Hero';
import Jobs from './Jobs';
import Map from './Map';

function JobsNeeded({ jobs, deleteJob, editJob, contractorProfile, properties }) {
    const { user } = useContext(UserContext);
    const ctaFirst = ['Login to See More','/login'];
    const ctaSecond = ['Add a Job','/dashboard'];

    const map = (<Map properties={ properties } />);
    
    // Show loading if jobs is null
   if(!jobs ) { return <h2>Loading...</h2> }

    return (
        <>
            <Hero title="welcome to jindah" summary="The consolidated home of jobs we need done at home. Can you help with one of these jobs?" ctaFirst={ user? ctaSecond : ctaFirst }/>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                    }}
                >
                    <Container maxWidth="md">
                        { map }
                        <Jobs jobs={ jobs } deleteJob={ deleteJob } editJob={ editJob } contractorProfile={ contractorProfile }/>
                    </Container>
                </Box>
        </>
    )

}

export default JobsNeeded;