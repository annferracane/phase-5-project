// import '../css/App.css';
import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserContext } from "../context/user";
import Navigation from "./Navigation";
import SubmitJob from "./SubmitJob";
import Jobs from "./Jobs";
import Dashboard from "./Dashboard";

function App() {
  const [errors, setErrors] = useState(null);
  const [count, setCount] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [userJobs, setUserJobs] = useState([]);
  const [properties, setProperties] = useState([]);
  const [laborCategories, setLaborCategories] = useState([]);

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
    fetch("/users/1/properties")
      .then((res) => res.json())
      .then((properties) => setProperties(properties));
  }, []);

  useEffect(() => {
    fetch("/users/1/jobs")
      .then((res) => res.json())
      .then((userJobs) => setUserJobs(userJobs));
  }, []);

  useEffect(() => {
    fetch("/labor_categories")
      .then((res) => res.json())
      .then((labor_categories) => setLaborCategories(labor_categories));
  }, []);

  if(errors) return <h1>{errors}</h1>

  if(!jobs) return <h1>No Jobs</h1>

  const jobsArray = jobs.map(job => <p>{job.title}</p>) 

  return (

      
      <BrowserRouter>
        <Navigation />
        <div className="App">
          <Switch>
            <Route path="/jobs-needed">
              <Jobs jobs={ jobs }/>
            </Route>
            <Route path="/dashboard">
              <Dashboard properties={ properties } userJobs={ userJobs } laborCategories={ laborCategories } />
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