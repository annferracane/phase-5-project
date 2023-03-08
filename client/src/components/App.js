import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserContext } from "../context/user";
import { ProfileContext } from "../context/profile";
import ContractorDashboard from "./ContractorDashboard";
import Dashboard from "./Dashboard";
import JobDetail from "./JobDetail";
import JobsNeeded from "./JobsNeeded";
import Login from "./Login";
import Navigation from "./Navigation";
import Profile from "./Profile";
import PropertyDetail from "./PropertyDetail";
import SignUp from "./SignUp";
import Welcome from "./Welcome";

function App() {
  // State
  const { user, setUser } = useContext(UserContext);
  const { profile, setProfile } = useContext(ProfileContext);
  const [errors, setErrors] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [contractorProfile, setContractorProfile] = useState(null);
  const [properties, setProperties] = useState([]);

  // Fetches data after fetching whether user is authorized
  useEffect(() => {
    fetch('/authorized_user')
    .then(res => {
      if(res.ok){
        res.json().then(user => {
          setUser(user);
          setProfile(profile ? profile : user.profile)
          setContractorProfile(contractorProfile ? contractorProfile : user.contractor_profile)
        })
      } else {
        setUser(null);
        res.json().then(data => setErrors(data.error));
      }
    })
  },[setUser, profile, contractorProfile, setProfile])

  // Fetch dependent on whether a user is or is not logged in
  useEffect(() => { 
    if(!user){
      fetch('/sample-jobs')
      .then(res => {
        if(res.ok){
          res.json().then(setJobs)
        }else {
          res.json().then(data => setErrors(data.error))
        }
      })
    } else if (user) {
      fetch(`/jobs`)
      .then(res => {
        if(res.ok){
          res.json().then(setJobs)
        }else {
          res.json().then(data => setErrors(data.error))
        }
      })
    }
  }, [user]);
  
  // Can be fetched without user (these are a properties on the map that show up to non-signed in users)
  useEffect(() => { 
    fetch(`/properties`)
    .then(res => {
      if(res.ok){
        res.json().then(setProperties)
      }else {
        res.json().then(data => setErrors(data.error))
      }
    })
  }, []);


  // Sets the user profile to profice context
  const updateProfile = (user) => {
    setProfile(user.profile);
  };

  // Updates states of whether user has a contractor profile
  const updateContractorProfile = (contractor_profile) => {
    setContractorProfile(contractor_profile);
  };

  // Adds property to all property list (for map display) 
  const addPropertyToList = (property) => {
    setProperties([...properties, property])
  };

  // Deletes property from map if it is deleted from user dashboard
  const deletePropertyFromList = (id) => {
    const newProperties = properties.filter(property => property.id !== id);
    setProperties(newProperties);
  }

  // Adds job to job list 
  const addJob = (job) => {
    console.log(job.is_accepted);
    setJobs([...jobs, job]);
  };

  // Removes job from job list
  const deleteJob = (id) => {
    const newJobs = jobs.filter(job => job.id !== id);
    setJobs(newJobs);
  }

  // Edits job content
  const editJob = (editJob) => {
    const filteredJobs = jobs.filter(job => job.id !== editJob.id);
    setJobs([...filteredJobs, editJob]);
  }

  // Loads if there are sever errors
  if(errors) return <h1>{errors}</h1>

  // Shows the below routes to the user if they are not logged in
  if(!user) return (
    <BrowserRouter>
      <Navigation contractorProfile={ contractorProfile } updateContractorProfile={ updateContractorProfile }/>
        <div className="App">
          <Switch>
            <Route path='/auth' component={() => {
                window.location.href = 'https://jindah-app.onrender.com/auth/google_oauth2';
                //window.location.href = 'http://localhost:3000/auth/google_oauth2'; // for local testing
                return null;
            }}/>
            <Route path="/job/:id">
              <JobDetail deleteJob={ deleteJob } editJob={ editJob }/>
            </Route>
            <Route path="/jobs-needed">
              <JobsNeeded jobs={ jobs } properties={ properties } deleteJob={ deleteJob } editJob={ editJob } contractorProfile={ contractorProfile }/>
            </Route>
            <Route path="/login">
              <Login updateContractorProfile={updateContractorProfile}/>
            </Route>
            <Route path="/signup">
              <SignUp /> 
            </Route>
            <Route path="/welcome">
              <Welcome />
            </Route>
            <Route path="/">
              <Welcome />
              {/* <Login updateContractorProfile={updateContractorProfile} /> */}
            </Route>
          </Switch>
        </div>
    </BrowserRouter>
  )

  // Shows the below 
  if(!jobs) return <h1>No Jobs</h1>

  // Renders the below to users that are signed in
  return (
      <BrowserRouter>
        <Navigation contractorProfile={ contractorProfile } updateContractorProfile={ updateContractorProfile }/>
        <div className="App">
          <Switch>
            <Route path="/contractor-dashboard" title="Contractor Dashboard | JINDAH">
              <ContractorDashboard addJob={addJob} contractorProfile={ contractorProfile }/>
            </Route>
            <Route path="/dashboard">
              <Dashboard profile={ profile } addPropertyToList={ addPropertyToList } deletePropertyFromList={ deletePropertyFromList } addJob={ addJob } deleteJob={ deleteJob } jobs={ jobs } properties={ properties } />
            </Route>
            <Route path="/job/:id">
              <JobDetail deleteJob={ deleteJob } editJob={ editJob }/>
            </Route>
            <Route path="/jobs-needed">
              <JobsNeeded jobs={ jobs } deleteJob={ deleteJob } editJob={ editJob } contractorProfile={ contractorProfile } properties={ properties }/>
            </Route>
            <Route path="/my-profile">
              <Profile profile={ profile } updateProfile={ updateProfile } />
            </Route>
            <Route path="/property/:id">
              <PropertyDetail editJob={ editJob } deleteJob={ deleteJob }/>
            </Route>
            <Route path="/welcome">
              <Welcome />
            </Route>
            <Route path="/">
              <JobsNeeded jobs={ jobs } addJob={ addJob } deleteJob={ deleteJob } editJob={ editJob } properties={ properties }/>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;