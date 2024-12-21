import logo from "./logo.svg";
import "./App.css";
import Homepage from "./Homepage/Homepage.jsx";
import SavedIdeasPage from "./SavedIdeasPage/SavedIdeasPage.jsx";
import MainHeader from "./MainHeader/MainHeader.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CreatePage from "./CreatePage/CreatePage.jsx";
function App() {
  return (
    <>
      <MainHeader />
      <Router>
        <Routes>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/create" element={<CreatePage />} />
          <Route exact path="/saved_ideas" element={<SavedIdeasPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
