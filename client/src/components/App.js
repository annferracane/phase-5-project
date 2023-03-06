// import '../css/App.css';
import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserContext } from "../context/user";
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
  const [errors, setErrors] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [contractorProfile, setContractorProfile] = useState(null);
  const [userJobs, setUserJobs] = useState([]);
  const [properties, setProperties] = useState([]);

  //console.log("fetching")

  // Authorized user fetch
  useEffect(() => {
    fetch('/authorized_user')
    .then(res => {
      if(res.ok){
        res.json().then(user => {
          setUser(user);
          fetchProperties(user);
          fetchUserJobs(user);
          fetchJobs();
          setProfile(profile ? profile : user.profile)
          setContractorProfile(contractorProfile ? contractorProfile : user.contractor_profile)
        })
      } else {
        setUser(null);
        res.json().then(data => setErrors(data.error));
      }
    })
  },[setUser, profile, contractorProfile])

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

  const fetchProperties = (user) => {
    fetch(`/users/${user.id}/properties`)
    .then(res => {
      if(res.ok){
        res.json().then(setProperties)
      }else {
        res.json().then(data => setErrors(data.error))
      }
    })
  };

  const fetchUserJobs = (user) => {
    fetch(`/users/${user.id}/jobs`)
    .then(res => {
      if(res.ok){
        res.json().then(setUserJobs)
      }else {
        res.json().then(data => setErrors(data.error))
      }
    })
  }

  const updateProfile = (user) => {
    setProfile(user.profile);
  };

  const updateContractorProfile = (user) => {
    setContractorProfile(user.contractor_profile);
  };

  const addPropertyToList = (property) => {
    setProperties([...properties, property]);
  };

  //delete a property?

  const addJob = (job, user) => {
    setJobs([...jobs, job]);
    fetchUserJobs(user); // is this necessary?
  };

  const deleteJob = (id) => {
    const newJobs = jobs.filter(job => job.id !== id);
    setJobs(newJobs);
    fetchUserJobs(user); // is this necessary?
    //fetchContractorJobs
  }

  const editJob = (editJob) => {
    const filteredJobs = jobs.filter(job => job.id !== editJob.id);
    setJobs([...filteredJobs, editJob]);
    fetchUserJobs(user); // is this necessary?
    //fetchContractorJobs
  }

  if(errors) return <h1>{errors}</h1>

  if(!user) return (
    <BrowserRouter>
      <Navigation />
        <div className="App">
          <Switch>
            <Route path='/auth' component={() => {
                window.location.href = 'https://jindah-app.onrender.com/auth/google_oauth2';
                //window.location.href = 'http://localhost:3000/auth/google_oauth2';
                return null;
            }}/>
            <Route path="/job/:id">
              <JobDetail deleteJob={ deleteJob } editJob={ editJob }/>
            </Route>
            <Route path="/jobs-needed">
              <JobsNeeded jobs={ jobs } deleteJob={ deleteJob } editJob={ editJob } contractorProfile={ contractorProfile }/>
            </Route>
            <Route path="/login">
              <Login updateProfile={updateProfile} updateContractorProfile={updateContractorProfile}/>
            </Route>
            <Route path="/signup">
              <SignUp /> 
            </Route>
            <Route path="/welcome">
              <Welcome />
            </Route>
            <Route path="/">
              <Login />
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
              <ContractorDashboard contractorProfile={ contractorProfile }/>
            </Route>
            <Route path="/dashboard">
              <Dashboard profile={ profile } properties={ properties } userJobs={ userJobs } addPropertyToList={ addPropertyToList } addJob={ addJob } deleteJob={ deleteJob } />
            </Route>
            <Route path="/job/:id">
              <JobDetail deleteJob={ deleteJob } editJob={ editJob }/>
            </Route>
            <Route path="/jobs-needed">
              <JobsNeeded jobs={ jobs } deleteJob={ deleteJob } editJob={ editJob } contractorProfile={ contractorProfile }/>
            </Route>
            <Route path="/login">
              <Login updateProfile={ updateProfile } updateContratorProfile={ updateContractorProfile }/>
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
              <JobsNeeded jobs={ jobs } deleteJob={ deleteJob } editJob={ editJob }/>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;