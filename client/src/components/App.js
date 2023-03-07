import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserContext } from "../context/user";
import { ProfileContext } from "../context/profile";
import Navigation from "./Navigation";
import JobsNeeded from "./JobsNeeded";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import PropertyDetail from "./PropertyDetail";
import JobDetail from "./JobDetail";
import Welcome from "./Welcome";
import Login from "./Login";
import SignUp from "./SignUp";
import ContractorDashboard from "./ContractorDashboard";

function App() {
  const { user, setUser } = useContext(UserContext);
  const { profile, setProfile } = useContext(ProfileContext);
  const [errors, setErrors] = useState(null);
  const [jobs, setJobs] = useState([]);
  //const [profile, setProfile] = useState(null);
  const [contractorProfile, setContractorProfile] = useState(null);
  // const [userJobs, setUserJobs] = useState([]);
  const [properties, setProperties] = useState([]);
  // const [userProperties, setUserProperties] = useState([]);

  // Authorized user fetch
  useEffect(() => {
    fetch('/authorized_user')
    .then(res => {
      if(res.ok){
        res.json().then(user => {
          setUser(user);
          fetchJobs();
          fetchProperties();
          setProfile(profile ? profile : user.profile)
          setContractorProfile(contractorProfile ? contractorProfile : user.contractor_profile) // can make context
        })
      } else {
        setUser(null);
        res.json().then(data => setErrors(data.error));
      }
    })
  },[setUser, profile, contractorProfile, setProfile])

  // Can be fetched without user context
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
    }
  }, [user]);

  const fetchProperties = () => {
    fetch(`/properties`)
    .then(res => {
      if(res.ok){
        res.json().then(setProperties)
      }else {
        res.json().then(data => setErrors(data.error))
      }
    })
  };

  // Require user context to fetch
  const fetchJobs = () => {
    fetch(`/jobs`)
    .then(res => {
      if(res.ok){
        res.json().then(setJobs)
      }else {
        res.json().then(data => setErrors(data.error))
      }
    })
  };

  const updateProfile = (user) => {
    setProfile(user.profile);
  };

  const updateContractorProfile = (user) => {
    setContractorProfile(user.contractor_profile);
  };

  const addPropertyToList = (property) => {
    setProperties([...properties, property])
  };

  const deletePropertyFromList = (id) => {
    const newProperties = properties.filter(property => property.id !== id);
    setProperties(newProperties);
  }

  const addJob = (job) => {
    setJobs([...jobs, job]);
  };

  const deleteJob = (id) => {
    const newJobs = jobs.filter(job => job.id !== id);
    setJobs(newJobs);
  }

  const editJob = (editJob) => {
    const filteredJobs = jobs.filter(job => job.id !== editJob.id);
    setJobs([...filteredJobs, editJob]);
  }

  if(errors) return <h1>{errors}</h1>

  if(!user) return (
    <BrowserRouter>
      <Navigation />
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
              <JobsNeeded jobs={ jobs } deleteJob={ deleteJob } editJob={ editJob } contractorProfile={ contractorProfile }/>
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
              <Login updateContractorProfile={updateContractorProfile} />
            </Route>
          </Switch>
        </div>
    </BrowserRouter>
  )
//contractorJobs
  if(!jobs) return <h1>No Jobs</h1>

  return (
      <BrowserRouter>
        <Navigation contractorProfile={ contractorProfile } updateContractorProfile={ updateContractorProfile }/>
        <div className="App">
          <Switch>
            <Route path="/contractor-dashboard">
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
            <Route path="/login">
              <Login updateContratorProfile={ updateContractorProfile }/>
            </Route>
            <Route path="/my-profile">
              <Profile profile={ profile } updateProfile={ updateProfile } />
            </Route>
            <Route path="/property/:id">
              <PropertyDetail />
            </Route>
            <Route path="/welcome">
              <Welcome />
            </Route>
            <Route path="/">
              <JobsNeeded jobs={ jobs } addJob={ addJob } deleteJob={ deleteJob } editJob={ editJob } />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;