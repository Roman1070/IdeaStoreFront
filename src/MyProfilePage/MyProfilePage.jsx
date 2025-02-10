import { useState } from "react";
import { GetImageSrc, GetLocalImageSrc } from "../utils";
import "./MyProfilePage.css";
import { GetBoards, GetCurrentProfile, GetSavedIdeas } from "../requests";
import ButtonLight from "../ButtonLight/ButtonLight";
import BoardsScroll from "../BoardsScroll/BoardsScroll";
import IdeasScroll from "../IdeasScroll";

export default function MyProfilePage() {
  const [profile, setProfile] = useState();
  const [boards, setBoards] = useState();
  const [ideas, setIdeas] = useState();
  const [boardsParentHeight, setBoardsParentHeight] = useState(266);
  const [copied, setCopied] = useState();

  function onShareClicked() {
    navigator.clipboard.writeText(
      `https://ideastore.space/profile/${profile.id}`
    );
    setCopied(true);
  }

  setTimeout(() => {
    var boardsParent = document.getElementById("boardsParent");
    if (boardsParent) {
      setBoardsParentHeight(boardsParent.offsetHeight);
    }
  }, 50);

  if (!profile && !boards && !ideas) {
    GetCurrentProfile((profile) => {
      setProfile(profile);
      GetBoards(profile.id, (boards) => {
        setBoards(boards);
      });
    });
    GetSavedIdeas(200, 0, (ideas) => {
      setIdeas(ideas);
    });
  }

  if (profile && boards && ideas)
    return (
      <div className="myProfilePage">
        <div className="myProfileImageBlock">
          <img
            className="myProfileImage"
            src={
              profile.avatarImage
                ? GetImageSrc(profile.avatarImage)
                : GetLocalImageSrc("user.png")
            }
          ></img>
        </div>
        <span className="myProfileName">{profile.name}</span>
        <div className="myProfileButtonsBlock">
          <ButtonLight onClick={onShareClicked}>
            {copied ? "Скопировано" : "Поделиться"}
          </ButtonLight>
          <div
            style={{
              width: "30px",
            }}
          ></div>
          <ButtonLight url={"/profile_settings"}>Изменить профиль</ButtonLight>
        </div>
        <span className="myProfileLabel">Доски</span>
        <BoardsScroll boards={boards}></BoardsScroll>
        <div
          style={{
            border: "1px solid #bbb",
            marginTop: "10px",
            marginBottom: "30px",
          }}
        ></div>
        <span className="myProfileLabel">Идеи</span>
        <IdeasScroll
          disableSave={true}
          ideas={ideas}
          visibleScrollSize={window.innerHeight - 430 - boardsParentHeight}
        ></IdeasScroll>
      </div>
    );
}
