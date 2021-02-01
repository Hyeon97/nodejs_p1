//import './App.css';
//import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import NavBar from './components/views/NavBar/NavBar'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Footer from './components/views/Footer/Footer'


const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          {/* 둘다 똑같이 작동 */}
          {/* <Route exact path="/"><LandingPage /></Route> */}
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

