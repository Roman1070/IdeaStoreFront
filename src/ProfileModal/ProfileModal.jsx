import { DeleteCookie } from "../utils";
import { GetImageSrc } from "../utils";
import { GetLocalImageSrc } from "../utils";
import "./ProfileModal.css";
function signOut() {
  DeleteCookie("token", "/", "");
  window.location.replace("/");
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
            <a href="/my_profile" className="profileModalProfileLink"></a>
          </div>
          <div className="profileModalButtonWrapper">
            <a href="/profile_settings" className="profileModalButton">
              <span>Настройки</span>
            </a>
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
