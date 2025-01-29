import { useState } from "react";
import "./ProfilePreviewPage.css";
import { GetImageSrc, GetLocalImageSrc } from "../utils";
import {
  GetIdeas,
  GetProfile,
  GetCurrentUsersBoards,
  GetBoards,
  SendMessage,
} from "../requests";
import ButtonLight from "../ButtonLight/ButtonLight";
import IdeasScroll from "../IdeasScroll";
import BoardsScroll from "../BoardsScroll/BoardsScroll";
import InputField from "../InputField/InputField";

export default function ProfilePreviewPage() {
  function validateMessage() {
    console.log(message);
    if (!message) {
      setMessageError("Message can't be empty");
      return false;
    }
    return true;
  }

  function trySendMessage() {
    if (!validateMessage()) return;

    SendMessage(parseInt(id), message, "", true, () => {
      setShowMessageModal(false);
      setMessage("");
    });
  }
  const id = window.location.pathname.substring(9);
  const [profile, setProfile] = useState();
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [showMessageModal, setShowMessageModal] = useState();
  const [ideas, setIdeas] = useState([]);
  const [boards, setBoards] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  if (!profile) {
    GetProfile(id, (prof) => {
      var ideasIds = [];
      if (prof) {
        for (var i = 0; i < prof.savedIdeas.length; i++) {
          ideasIds.push(prof.savedIdeas[i].ideaId);
        }
      }

      GetIdeas(ideasIds, (ideasJson) => {
        GetBoards(prof.id, (boardsJson) => {
          setBoards(boardsJson);
          setProfile(prof);
          setIdeas(ideasJson);
        });
      });
    });
  }

  if (profile && boards && ideas)
    return (
      <div className="profilePreviewPage">
        <img
          className="profilePreviewPageAvatar"
          src={
            profile.avatarImage
              ? GetImageSrc(profile.avatarImage)
              : GetLocalImageSrc("user.png")
          }
        />
        <span className="profilePreviewPageName">{profile.name}</span>
        <a
          href={
            profile.link.includes("https")
              ? profile.link
              : "https://" + profile.link
          }
          target="_blank"
          rel="noopener noreferrer"
          className="profilePreviewPageLink"
        >
          {profile.link}
        </a>
        <span className="profilePreviewPageDescription">
          {profile.description}
        </span>
        <div className="profilePreviewPageButtons">
          <button
            onClick={() => setShowMessageModal(!showMessageModal)}
            className="sendMessageButton"
          >
            Отправить сообщение
          </button>
          {showMessageModal && (
            <div className="sendMessageModal">
              <InputField
                height="100px"
                isCorrect={!messageError}
                error={messageError}
                value={message}
                onChangeAction={(value) => {
                  setMessage(value);
                  setMessageError("");
                }}
              ></InputField>
              <button
                onClick={trySendMessage}
                className="sendMessageButton"
                style={{
                  width: "100%",
                  height: "40px",
                }}
              >
                Отправить
              </button>
            </div>
          )}
          <button className="subscribeButton">Подписаться</button>
        </div>
        <div className="profilePreviewPageTabs">
          <ButtonLight
            isSelected={selectedTab == 0}
            onClick={() => setSelectedTab(0)}
          >
            Пины
          </ButtonLight>
          <ButtonLight
            isSelected={selectedTab == 1}
            onClick={() => setSelectedTab(1)}
          >
            Доски
          </ButtonLight>
        </div>
        {selectedTab == 0 && (
          <IdeasScroll disableSave={true} ideas={ideas}></IdeasScroll>
        )}
        {selectedTab == 1 && <BoardsScroll boards={boards}></BoardsScroll>}
      </div>
    );
}
