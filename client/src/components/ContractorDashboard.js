import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/user";
import Hero from './Hero';
import Jobs from './Jobs';

function ContractorDashboard({ contractorProfile, addJob }) {
  // State and other variables
  const { user } = useContext(UserContext);
  const [contractorJobs, setContractorJobs] = useState([]);
  const [errors, setErrors] = useState(null);
  const ctaFirst = ['Accept More Jobs','/jobs-needed'];

  // Fetch jobs that the contractor has accepted
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

  // Release job handler (if contractor decides not to do the job)
  const releaseJob = (releaseJob) => {
    const newJobs = contractorJobs.filter(job => job.id !== releaseJob.id);
    setContractorJobs(newJobs);
  };

  // Render errors from server if present
  if(errors) return <h1>{errors}</h1>

  // Show loading if contractorJobs is null
  if(!contractorJobs) { return <h2>Loading...</h2> }

  return (
      <>
          <Hero title={`${user.profile.first_name}'s Accepted Jobs`} summary="Thanks for tackling these jobs!" ctaFirst={ ctaFirst }/>
          <Jobs jobs={ contractorJobs } addJob={ addJob } releaseJob={ releaseJob } contractorProfile={contractorProfile} />
      </>
  )

}

export default ContractorDashboard;