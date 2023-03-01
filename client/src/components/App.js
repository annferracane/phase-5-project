// import '../css/App.css';
import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserContext } from "../context/user";
import Navigation from "./Navigation";
import SubmitJob from "./SubmitJob";
import Jobs from "./Jobs";
import Dashboard from "./Dashboard";
import PropertyDetail from "./PropertyDetail";
import JobDetail from "./JobDetail";

function App() {
  const [errors, setErrors] = useState(null);
  const [count, setCount] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [userJobs, setUserJobs] = useState([]);
  const [properties, setProperties] = useState([]);
  const [laborCategories, setLaborCategories] = useState([]);

  // Fix fetches and add "if res.ok"

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  useEffect(() => {
    fetch("/jobs")
      .then((res) => res.json())
      .then((jobs) => setJobs(jobs));
  }, []);

  useEffect(() => {
    fetch("/users/2/properties")
      .then((res) => res.json())
      .then((properties) => setProperties(properties));
  }, []);

  useEffect(() => {
    fetch("/users/2/jobs")
      .then((res) => res.json())
      .then((userJobs) => setUserJobs(userJobs));
  }, []);

  useEffect(() => {
    fetch("/labor_categories")
      .then((res) => res.json())
      .then((labor_categories) => setLaborCategories(labor_categories));
  }, []);

  const addPropertyToList = (property) => {
    setProperties([...properties, property]);
  };

  const addJobToList = (job) => {
    setUserJobs([...userJobs, job]);
  };
 
  if(errors) return <h1>{errors}</h1>

  if(!jobs) return <h1>No Jobs</h1>

  return (
      <BrowserRouter>
        <Navigation />
        <div className="App">
          <Switch>
            <Route path="/job/:id">
              <JobDetail />
            </Route>
            <Route path="/jobs-needed">
              <Jobs jobs={ jobs }/>
            </Route>
            <Route path="/dashboard">
              <Dashboard properties={ properties } userJobs={ userJobs } addPropertyToList={ addPropertyToList } addJobToList={ addJobToList } />
            </Route>
            <Route path="/property/:id">
              <PropertyDetail />
            </Route>
            <Route path="/submit-a-job">
              <SubmitJob laborCategories={ laborCategories }/>
            </Route>
            <Route path="/">
              <h1>Page Count: {count}</h1>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;