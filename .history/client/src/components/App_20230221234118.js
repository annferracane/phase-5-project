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
          <Route path={"/"} element={<><Cereals cereals={ cereals }/></>} />
          <Route path={"/reviews"} element={<><Reviews reviews={ reviews } deleteReview={ deleteReview } editReview={ editReview } /></>} />
          <Route path={"/new-review"} element={<><NewReview cereals={ cereals } addNewReview={ addNewReview }/></>} />
          <Route path={"/new-review/:id"} element={<><NewReview cereals={ cereals } addNewReview={ addNewReview }/></>} />
          <Route path={"/cereals/:id"} element={<><CerealDetail cereal={ cereals } reviews={ reviews } deleteReview={ deleteReview } editReview={ editReview }/></>} />
        </Routes>
      <div className="App">
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