import "./SavedIdeasPage.css";
import ButtonLight from "../ButtonLight/ButtonLight";
import IdeasScroll from "../IdeasScroll";
import { useState } from "react";
import {
  GetCurrentProfile,
  GetSavedIdeas,
  GetCurrentUsersBoards,
} from "../requests";
import BoardsScroll from "../BoardsScroll/BoardsScroll";

export default function SavedIdeasPage() {
  function onBoardCreated() {
    GetCurrentUsersBoards((json) => {
      setBoards(json);
    });
  }
  function onBoardRemoved() {
    GetCurrentUsersBoards((json) => {
      setBoards(json);
    });
  }
  const [ideas, setIdeas] = useState(null);
  const [boards, setBoards] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [profile, setProfile] = useState(null);
  if (ideas == null && profile == null) {
    GetCurrentProfile((json) => {
      setProfile(json.data);
      GetSavedIdeas((ideas) => {
        setIdeas(ideas);
      });
    });
  }
  if (boards == null) {
    GetCurrentUsersBoards((json) => {
      setBoards(json);
    });
  }
  if (ideas != null && profile != null)
    return (
      <>
        <div className="upperModalBlock">
          <div className="upperHeader">
            <span className="savedIdeasHeader">Ваши сохраненные идеи</span>
            <div className="profileBlockOnSavedIdeas">
              <img
                className="profilePictureOnSavedIdeas"
                src="profileTemp.jpg"
                alt=""
              />
              <div className="usernameBlockInSavedIdeas">
                <div className="usernameInSavedIdeas">{profile.name}</div>
                <div>0 подписок</div>
              </div>
              <button className="openProfileButtonInSavedIdeas">
                Открыть профиль
              </button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <span
              style={{
                marginRight: "30px",
              }}
            >
              <ButtonLight
                onClick={() => setSelectedTab(0)}
                isSelected={selectedTab === 0}
              >
                Пины
              </ButtonLight>
            </span>

            <ButtonLight
              onClick={() => setSelectedTab(1)}
              isSelected={selectedTab === 1}
            >
              Доски
            </ButtonLight>
          </div>
        </div>

        {selectedTab === 0 && (
          <IdeasScroll saved={true} ideas={ideas}></IdeasScroll>
        )}
        {selectedTab == 1 && (
          <BoardsScroll
            enableDelete={true}
            enableCreateButton={true}
            boards={boards}
            onBoardCreated={onBoardCreated}
            onBoardRemoved={onBoardRemoved}
          ></BoardsScroll>
        )}
      </>
    );
}
