// import '../css/App.css';
import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
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
    <UserProvider>
      <Navigation />
      <Routes>
          <Route path={"/"} element={<h1>Page Count: {count}</h1>} />
        </Routes>
      
      <Switch>
        <Route path="/">
          <h1>Page Count: {count}</h1>
        </Route>
      </Switch>
      </div>
    </UserProvider>
  );
}

export default App;