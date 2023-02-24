// import '../css/App.css';
import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserContext } from "../context/user";
import Navigation from "./Navigation";

function App() {
  const [errors, setErrors] = useState(null);
  const [count, setCount] = useState(0);
  const [jobs, setJobs] = useState([]);

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

  if(errors) return <h1>{errors}</h1>

  if(!jobs) return <h1>No Jobs</h1>

  const jobsArray = jobs.map(job => console.log(jobs)) 

  return (

      
      <BrowserRouter>
        <Navigation />
        <div className="App">
          <Switch>
            <Route path="/">
              <h1>Page Count: {count}</h1>
              {jobsArray}
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;