import React from "react";
import { Provider } from "react-redux";
//import { } from "react-router-dom";
import store from "./Store/store";
import PrivateRoute from "./Components/Admin/Login/Auth/PrivateRoute";
import Login from "./Components/Admin/Login";
import Layout from "./Components/Admin/Layout";
import userLayout from './Components/User/Layout';
import {
  BrowserRouter as Router,
  HashRouter, Route, Switch,
  Link,
  useParams
} from "react-router-dom";

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <div>
            <Switch>
            <Route path="/employeeportal/:name" component={userLayout}/> 
              {/* <Route exact={true} path={"/"} component={userLayout} /> */}
              <Route exact={true} path={"/admin/login"} component={Login} />
              <PrivateRoute path={"/admin"} component={Layout} />
            </Switch>
          </div>
        </Router>
      </div>
    </Provider>
  );
}



export default App;
