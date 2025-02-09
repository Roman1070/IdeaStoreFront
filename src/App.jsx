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
  Outlet,
} from "react-router-dom";
import CreatePage from "./CreatePage/CreatePage.jsx";
import MainHeaderGuest from "./MainHeader/MainHeaderGuest.jsx";
import LandingPage from "./LandingPage/LandingPage.jsx";

import IdeaPreviewPage from "./IdeaPreviewPage/IdeaPreviewPage.jsx";
import { GetCookie } from "./utils.js";
import BoardPreviewPage from "./BoardPreviewPage/BoardPreviewPage.jsx";
import ProfilePreviewPage from "./ProfilePreviewPage/ProfilePreviewPage.jsx";
import MyProfilePage from "./MyProfilePage/MyProfilePage.jsx";
import ProfileSettingsPage from "./ProfileSettingsPage/ProfileSettingsPage.jsx";
import { useState } from "react";

function App() {
  var loggedIn = GetCookie("token");
  const [foundIdeas, setFoundIdeas] = useState();
  const [searchInput, setSearchInput] = useState();

  return (
    <>
      {loggedIn != null ? (
        <MainHeaderSignedIn
          onFoundIdeasChanged={(ideas) => setFoundIdeas(ideas)}
          onSearchInputChanged={(value) => setSearchInput(value)}
        />
      ) : (
        <MainHeaderGuest />
      )}
      <Outlet context={[foundIdeas, searchInput]} />
    </>
  );
}

export default App;
