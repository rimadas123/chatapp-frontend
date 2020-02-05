import React from 'react';
import logo from './logo.svg';
import Register from './Components/Register';
import Login from './Components/Login';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <nav>
        <div className="container">
          <Link className="brand" to={"/sign-in"}>ChatApp</Link>
           <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
             <ul>
              <li className="item">
                <Link className="nav-link" to ={"/sign-in"}>Login</Link>
              </li>
              <li className="item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
             </ul>
           </div>
        </div>
      </nav>

      <div className="form">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={Register} />
          </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
