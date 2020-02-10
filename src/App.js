import React from 'react';
import Register from './Components/Register';
import Login from './Components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import DashBoard from './Components/DashBoard';
import './Components/css/form.css';

function App() {
  return (
    <Router>
    <div>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={Register} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/resetpassword/:token" component={ResetPassword} />
            <Route path="/dashboard" component={DashBoard} />
          </Switch>
    </div>
    </Router>
  );
}

export default App;
