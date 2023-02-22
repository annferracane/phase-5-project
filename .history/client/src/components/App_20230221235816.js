// import '../css/App.css';
import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserContext } from "../context/user";
import Navigation from "./Navigation";

function App() {
  const [errors, setErrors] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  if(errors) return <h1>{errors}</h1>

  return (
      <></>
      <Navigation />
      <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <h1>Page Count: {count}</h1>
          </Route>
        </Switch>
      </BrowserRouter>
      </div>
  );
}

export default App;