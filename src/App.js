import React from 'react';
import Register from './Components/Register';
import Login from './Components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ForgotPassword from './Components/ForgotPassword';
import DashBoard from './Components/DashBoard';

function App() {
  return (
    <Router>
    <div>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={Register} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/dashboard" component={DashBoard} />
          </Switch>
    </div>
    </Router>
  );
}

export default App;
