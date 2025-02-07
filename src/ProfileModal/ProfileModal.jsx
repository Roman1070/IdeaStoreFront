import { Link, Navigate } from "react-router-dom";
import { DeleteCookie } from "../utils";
import { GetImageSrc } from "../utils";
import { GetLocalImageSrc } from "../utils";
import "./ProfileModal.css";
function signOut() {
  DeleteCookie("token", "/", "");
  return <Navigate replace to="/" />;
}
export default function ProfileModal({ profile }) {
  return (
    <>
      <div className="profileModalBlock">
        <div className="profileModalContainer">
          <div
            style={{
              margin: "10px 10px 10px 20px",
            }}
          >
            Сейчас:
          </div>
          <div className="profileModalUserBlockWrapper">
            <div className="profileModalUserBlock">
              <img
                className="profileModalBlockAvatar"
                src={
                  profile.avatarImage
                    ? GetImageSrc(profile.avatarImage)
                    : GetLocalImageSrc("user.png")
                }
              ></img>
              <div className="profileModalUserDataContainer">
                <div className="profileModalUsername">{profile.name}</div>
                <div className="profileModalEmail">Личный</div>
                <div className="profileModalEmail">{profile.email}</div>
              </div>
            </div>
            <Link to="/my_profile" className="profileModalProfileLink"></Link>
          </div>
          <div className="profileModalButtonWrapper">
            <Link to="/profile_settings" className="profileModalButton">
              <span>Настройки</span>
            </Link>
          </div>
          <div className="profileModalButtonWrapper">
            <div onClick={signOut} className="profileModalButton">
              <span>Выйти</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
