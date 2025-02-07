// <>
//   {loggedIn != null ? (
//     <MainHeaderSignedIn
//       onFoundIdeasChanged={(ideas) => setFoundIdeas(ideas)}
//       onSearchInputChanged={(value) => setSearchInput(value)}
//     />
//   ) : (
//     <MainHeaderGuest />
//   )}
//   <Router>
//     <Routes>
//       {/* This route is for home component
//       with exact path "/", in component props
//       we passes the imported component*/}
//       <Route
//         exact
//         path="/"
//         element={
//           loggedIn != null ? (
//             <Homepage foundIdeas={foundIdeas} searchInput={searchInput} />
//           ) : (
//             <LandingPage />
//           )
//         }
//       />
//       <Route exact path="/create" element={<CreatePage />} />
//       <Route exact path="/saved_ideas" element={<SavedIdeasPage />} />
//       <Route exact path="/idea/*" element={<IdeaPreviewPage />} />
//       <Route exact path="/board/*" element={<BoardPreviewPage />} />
//       <Route exact path="/profile/*" element={<ProfilePreviewPage />} />
//       <Route exact path="/my_profile/*" element={<MyProfilePage />} />
//       <Route
//         exact
//         path="/profile_settings/*"
//         element={<ProfileSettingsPage />}
//       />
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   </Router>
// </>

import { createBrowserRouter, Navigate } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import CreatePage from "./CreatePage/CreatePage";
import SavedIdeasPage from "./SavedIdeasPage/SavedIdeasPage";
import App from "./App";
import IdeaPreviewPage from "./IdeaPreviewPage/IdeaPreviewPage";
import BoardPreviewPage from "./BoardPreviewPage/BoardPreviewPage";
import ProfilePreviewPage from "./ProfilePreviewPage/ProfilePreviewPage";
import MyProfilePage from "./MyProfilePage/MyProfilePage";
import ProfileSettingsPage from "./ProfileSettingsPage/ProfileSettingsPage";
import { useState } from "react";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/create", element: <CreatePage /> },
      { path: "/saved_ideas", element: <SavedIdeasPage /> },
      { path: "/idea/*", element: <IdeaPreviewPage /> },
      { path: "/board/*", element: <BoardPreviewPage /> },
      { path: "/profile/*", element: <ProfilePreviewPage /> },
      { path: "/my-profile", element: <MyProfilePage /> },
      { path: "/profile_settings/*", element: <ProfileSettingsPage /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);
