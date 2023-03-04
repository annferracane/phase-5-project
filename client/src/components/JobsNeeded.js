import { useContext } from "react";
import { UserContext } from "../context/user";
import Hero from './Hero';
import Jobs from './Jobs';

function JobsNeeded({ jobs, deleteJob, editJob, contractorProfile }) {
    const { user } = useContext(UserContext);
    const ctaFirst = ['Login to See More','/login'];
    const ctaSecond = ['Add a Job','/dashboard'];
    
    // Show loading if jobs is null
   if(!jobs) { return <h2>Loading...</h2> }

    return (
        <>
            <Hero title="welcome to jindah" summary="Can you help with one of these jobs?" ctaFirst={ user? ctaSecond : ctaFirst }/>
            <Jobs jobs={ jobs } deleteJob={ deleteJob } editJob={ editJob } contractorProfile={ contractorProfile }/>
        </>
    )

}

export default JobsNeeded;