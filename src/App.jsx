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
      <Router>
        <Routes>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route
            exact
            path="/"
            element={
              loggedIn != null ? (
                <Homepage foundIdeas={foundIdeas} searchInput={searchInput} />
              ) : (
                <LandingPage />
              )
            }
          />
          <Route exact path="/create" element={<CreatePage />} />
          <Route exact path="/saved_ideas" element={<SavedIdeasPage />} />
          <Route exact path="/idea/*" element={<IdeaPreviewPage />} />
          <Route exact path="/board/*" element={<BoardPreviewPage />} />
          <Route exact path="/profile/*" element={<ProfilePreviewPage />} />
          <Route exact path="/my_profile/*" element={<MyProfilePage />} />
          <Route
            exact
            path="/profile_settings/*"
            element={<ProfileSettingsPage />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
