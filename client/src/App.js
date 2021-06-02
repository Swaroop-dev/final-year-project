import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Signup, Signin, Homepage, Addcontacts } from "./Components";

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signin" exact>
          <Signin />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/Addcontacts" exact>
          <Addcontacts />
        </Route>
        
        <Route path="/addContacts" exact>
          <Addcontacts />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
