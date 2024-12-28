import logo from "./logo.svg";
import "./App.css";
import Homepage from "./Homepage/Homepage.jsx";
import SavedIdeasPage from "./SavedIdeasPage/SavedIdeasPage.jsx";
import MainHeaderSignedIn from "./MainHeader/MainHeaderSignedIn.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CreatePage from "./CreatePage/CreatePage.jsx";
import MainHeaderGuest from "./MainHeader/MainHeaderGuest.jsx";
import LandingPage from "./LandingPage/LandingPage.jsx";
import { useReducer, useState } from "react";
import IdeaPreviewPage from "./IdeaPreviewPage/IdeaPreviewPage.jsx";

function App() {
  var loggedIn = localStorage.getItem("loggedIn");
  if (loggedIn == null) {
    loggedIn = false;
  }
  return (
    <>
      <div id="registerModal"></div>
      {loggedIn == "true" ? <MainHeaderSignedIn /> : <MainHeaderGuest />}
      <Router>
        <Routes>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route
            exact
            path="/"
            element={loggedIn == "true" ? <Homepage /> : <LandingPage />}
          />
          <Route exact path="/create" element={<CreatePage />} />
          <Route exact path="/saved_ideas" element={<SavedIdeasPage />} />
          <Route exact path="/idea/*" element={<IdeaPreviewPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
