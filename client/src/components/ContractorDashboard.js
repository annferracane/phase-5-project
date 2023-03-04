import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/user";
import Hero from './Hero';
import Jobs from './Jobs';

function ContractorDashboard({contractorProfile}) {
    const { user } = useContext(UserContext);
    const [contractorJobs, setContractorJobs] = useState([]);
    const [errors, setErrors] = useState(null);
    const ctaFirst = ['Accept More Jobs','/jobs-needed'];

    useEffect(() => {
        fetch(`/contractor_profiles/${user.contractor_profile.id}/jobs`)
        .then(res => {
          if(res.ok){
            res.json().then(setContractorJobs)
          }else {
            res.json().then(data => setErrors(data.error))
          }
        })
      }, [user]);

    if(errors) return <h1>{errors}</h1>

    // Show loading if contractorJobs is null
   if(!contractorJobs) { return <h2>Loading...</h2> }

    return (
        <>
            <Hero title={`${user.profile.first_name}'s Accepted Jobs`} summary="Thanks for tackling these jobs!" ctaFirst={ ctaFirst }/>
            <Jobs jobs={ contractorJobs } contractorProfile={contractorProfile} />
        </>
    )

}

export default ContractorDashboard;