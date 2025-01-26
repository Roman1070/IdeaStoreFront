import ButtonLight from "../ButtonLight/ButtonLight";
import ProfileModal from "../ProfileModal/ProfileModal";
import SearchInputField from "../SearchInputField/SearchInputField";
import SmallRoundButton from "../SmallRoundButton/SmallRoundButton";
import "./MainHeader.css";
import "../SmallRoundButton/SmallRoundButton.css";
import { useState } from "react";
import { GetImageSrc, GetLocalImageSrc } from "../utils";
import { GetChats, GetCurrentProfile } from "../requests";
import ChatsModal from "../ChatsModal/ChatsModal";
const HostName = "http://localhost:3000/";
export default function MainHeaderSignedIn() {
  const [profileModalEnabled, setProfileModalEnabled] = useState(false);
  const [chatsModalEnabled, setChatModalEnabled] = useState(false);
  const [chats, setChats] = useState();
  const [profile, setProfile] = useState();
  const smallButtonSize = 40;
  const smallButtonMargin = 8;
  if (!profile && !chats) {
    GetCurrentProfile((prof) => {
      GetChats((chatsJson) => {
        setProfile(prof);
        setChats(chatsJson.chats);
      });
    });
  }
  if (profile)
    return (
      <>
        <header className="mainHeader">
          <img
            src={HostName + "images/logo.png"}
            alt=""
            style={{
              height: "32px",
              display: "flex",
              transformOrigin: "50% 100%",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          />
          <span
            style={{
              padding: "0 8px",
              flexGrow: "2",
              position: "relative",
            }}
          >
            <ButtonLight
              url={"/"}
              isSelected={window.location.pathname === "/"}
            >
              Главная
            </ButtonLight>
          </span>
          <span
            style={{
              padding: "0 8px",
              flexGrow: "2",
              position: "relative",
            }}
          >
            <ButtonLight
              url={"/create"}
              isSelected={window.location.pathname === "/create"}
            >
              Создать
            </ButtonLight>
          </span>
          <SearchInputField />

          <SmallRoundButton
            size={smallButtonSize}
            imgSrc={HostName + "images/bell.png"}
            marginRight={smallButtonMargin}
          ></SmallRoundButton>

          <SmallRoundButton
            size={smallButtonSize}
            imgSrc={HostName + "images/message.png"}
            onClick={() => {
              setChatModalEnabled(!chatsModalEnabled);
              setProfileModalEnabled(false);
            }}
            marginRight={smallButtonMargin}
          ></SmallRoundButton>

          <SmallRoundButton
            size={smallButtonSize}
            isLink={true}
            forceRound={true}
            href="/saved_ideas"
            imgSrc={
              profile.avatarImage
                ? GetImageSrc(profile.avatarImage)
                : GetLocalImageSrc("user.png")
            }
          ></SmallRoundButton>
          <button
            className="arrowNearProfile"
            onClick={() => {
              setProfileModalEnabled(!profileModalEnabled);
              setChatModalEnabled(false);
            }}
          >
            <img
              src={GetLocalImageSrc("downArrowBlack.png")}
              alt=""
              className="imgInSmallRoundButton"
            />
          </button>
        </header>
        <div className="mainHeaderHeightBlock"></div>
        {profileModalEnabled && <ProfileModal />}
        {chatsModalEnabled && (
          <ChatsModal chats={chats} currentProfile={profile} />
        )}
      </>
    );
}
