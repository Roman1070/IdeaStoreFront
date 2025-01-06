import { useState } from "react";
import "./ProfilePreviewPage.css";
import { GetLocalImageSrc } from "../utils";
import { GetProfile } from "../requests";

export default function ProfilePreviewPage() {
  const id = window.location.pathname.substring(9);
  const [profile, setProfile] = useState();
  if (!profile) {
    GetProfile(id, (json) => {
      console.log(json);
      setProfile(json);
    });
  }
  if (profile)
    return (
      <div className="profilePreviewPage">
        <img
          className="profilePreviewPageAvatar"
          src={GetLocalImageSrc("profileTemp.jpg")}
        />
        <span className="profilePreviewPageName">{profile.name}</span>
      </div>
    );
}
