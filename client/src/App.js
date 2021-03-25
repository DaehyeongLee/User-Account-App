import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
//import NavBar from './components/views/NavBar/NavBar';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
//import Footer from './components/views/Footer/Footer';
import Auth from './hoc/auth';

//렌더링되어 페이지에 보이는 부분
//라우터를 여기에 설정해준다
//각 페이지는 컴포넌트 폴더에 들어있다
function App() {
  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/" component = {Auth(LandingPage, null )} />
          {/* 위 문장과 동일!
            <Route exact path = "/">
              <LandingPage />
            </Route>          
          */}
          <Route exact path="/login" component = {Auth(LoginPage, false)} />
          <Route exact path="/register" component = {Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
