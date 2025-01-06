import { useState } from "react";
import "./ProfilePreviewPage.css";
import { GetLocalImageSrc } from "../utils";
import {
  GetIdeas,
  GetProfile,
  GetCurrentUsersBoards,
  GetBoards,
} from "../requests";
import ButtonLight from "../ButtonLight/ButtonLight";
import IdeasScroll from "../IdeasScroll";
import BoardsScroll from "../BoardsScroll/BoardsScroll";

export default function ProfilePreviewPage() {
  const id = window.location.pathname.substring(9);
  const [profile, setProfile] = useState();
  const [ideas, setIdeas] = useState();
  const [boards, setBoards] = useState();
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
          src={GetLocalImageSrc("profileTemp.jpg")}
        />
        <span className="profilePreviewPageName">{profile.name}</span>
        <a className="profilePreviewPageLink">{profile.link}</a>
        <span className="profilePreviewPageDescription">
          {profile.description}
        </span>
        <div className="profilePreviewPageButtons">
          <button className="sendMessageButton">Отправить сообщение</button>
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
        {selectedTab == 0 && <IdeasScroll ideas={ideas}></IdeasScroll>}
        {selectedTab == 1 && <BoardsScroll boards={boards}></BoardsScroll>}
      </div>
    );
}
