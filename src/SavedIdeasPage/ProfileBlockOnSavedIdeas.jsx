import { Link } from "react-router-dom";
import { GetImageSrc, GetLocalImageSrc } from "../utils";

export default function ProfileBlockOnSavedIdeas({ profile }) {
  return (
    <div className="profileBlockOnSavedIdeas">
      <img
        className="profilePictureOnSavedIdeas"
        src={
          profile.avatarImage
            ? GetImageSrc(profile.avatarImage)
            : GetLocalImageSrc("user.png")
        }
        alt=""
      />
      <div className="usernameBlockInSavedIdeas">
        <div className="usernameInSavedIdeas">{profile.name}</div>
        <div>0 подписок</div>
      </div>
      <Link to="/my_profile" className="openProfileButtonInSavedIdeas">
        <span className="openProfileButtonInSavedIdeasText">
          Открыть профиль
        </span>
      </Link>
    </div>
  );
}
