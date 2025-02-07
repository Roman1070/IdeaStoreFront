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
import { GetImageSrc, GetLocalImageSrc } from "../utils";
import { Link } from "react-router-dom";

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
      GetSavedIdeas((ideas) => {
        setIdeas(ideas);
        setProfile(json);
      });
    });
  }
  if (boards == null) {
    GetCurrentUsersBoards((json) => {
      console.log(json);
      setBoards(json);
    });
  }

  if (ideas && profile && profile.id != -1)
    return (
      <>
        <div className="upperModalBlock">
          <div className="upperHeader">
            <span className="savedIdeasHeader">Ваши сохраненные идеи</span>
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
              <Link
                replace
                to="/my_profile"
                className="openProfileButtonInSavedIdeas"
              >
                <span className="openProfileButtonInSavedIdeasText">
                  Открыть профиль
                </span>
              </Link>
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
          <IdeasScroll
            availableBoards={boards}
            saved={true}
            ideas={ideas}
          ></IdeasScroll>
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
