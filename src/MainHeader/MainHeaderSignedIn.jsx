import ButtonLight from "../ButtonLight/ButtonLight";
import ProfileModal from "../ProfileModal/ProfileModal";
import SearchInputField from "../SearchInputField/SearchInputField";
import SmallRoundButton from "../SmallRoundButton/SmallRoundButton";
import "./MainHeader.css";
import "../SmallRoundButton/SmallRoundButton.css";
import { useEffect, useState } from "react";
import {
  AspectRatio,
  GetChatWebSocketAddress,
  GetImageSrc,
  GetLocalImageSrc,
} from "../utils";
import { GetChats, GetCurrentProfile } from "../requests";
import ChatsModal from "../ChatsModal/ChatsModal";
import { useNavigate } from "react-router-dom";

export default function MainHeaderSignedIn({
  onFoundIdeasChanged,
  onSearchInputChanged,
}) {
  const [profileModalEnabled, setProfileModalEnabled] = useState(false);
  const [chatsModalEnabled, setChatModalEnabled] = useState(false);
  const [chats, setChats] = useState();
  const [profile, setProfile] = useState();
  const [redirectToMain, setRedirectToMain] = useState(false);

  const smallButtonSize = 40;
  const smallButtonMargin = 8;
  if (!profile && !chats) {
    GetCurrentProfile((prof) => {
      GetChats((chatsJson) => {
        setProfile(prof);
        setChats(chatsJson);
      });
    });
  }

  const [chatSocket, setChatSocket] = useState();

  if (!chatSocket) {
    setChatSocket(new WebSocket(GetChatWebSocketAddress()));
  }
  if (chatSocket) {
    chatSocket.onopen = function (event) {};
    chatSocket.onclose = function (event) {
      setChatSocket(null);
    };
  }

  if (profile)
    return (
      <>
        <header className="mainHeader">
          <img
            onClick={() => window.location.assign("/")}
            src={GetLocalImageSrc("logo.png")}
            alt=""
            style={{
              height: "32px",
              display: "flex",
              transformOrigin: "50% 100%",
              marginLeft: "20px",
              marginRight: "10px",
            }}
          />
          {AspectRatio() > 0.7 && (
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
          )}
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
          <SearchInputField
            onFoundIdeasChanged={onFoundIdeasChanged}
            onSearchInputChanged={onSearchInputChanged}
          />

          <SmallRoundButton
            size={smallButtonSize}
            imgSrc={GetLocalImageSrc(
              chatsModalEnabled ? "messageBlack.png" : "message.png"
            )}
            onClick={() => {
              if (!chatsModalEnabled) {
                GetChats((chatsJson) => {
                  setChats(chatsJson);
                });
              }
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
        {profileModalEnabled && <ProfileModal profile={profile} />}
        {chatsModalEnabled && (
          <ChatsModal
            chatsWS={chatSocket}
            chats={chats}
            currentProfile={profile}
            closeFunc={() => setChatModalEnabled(false)}
            updateChatsFunc={() => {
              GetChats((chatsJson) => {
                setChats(chatsJson);
              });
            }}
          />
        )}
      </>
    );
}
