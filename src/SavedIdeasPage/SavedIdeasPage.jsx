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
import {
  AspectRatio,
  GetImageSrc,
  GetLocalImageSrc,
  GetSavedIdeasThrottled,
  UpdateIdeasSessionStorage,
} from "../utils";
import { Link } from "react-router-dom";
import ProfileBlockOnSavedIdeas from "./ProfileBlockOnSavedIdeas";

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

  function onScrolledDown(colsCount) {
    let ideasToLoad = colsCount * 6;
    GetSavedIdeasThrottled(ideasToLoad, (newIdeas) => {
      if (newIdeas.length > 0) {
        if (!sessionStorage.getItem("ideas")) {
          setIdeas(newIdeas);
          UpdateIdeasSessionStorage(
            newIdeas,
            ideasToLoad + parseInt(sessionStorage.getItem("ideasOffset"))
          );
        } else {
          let currentIdeas = JSON.parse(sessionStorage.getItem("ideas"));
          let currentIds = [];
          for (let i = 0; i < currentIdeas.length; i++) {
            currentIds.push(currentIdeas[i].id);
          }
          if (!currentIds.includes(newIdeas[0].id)) {
            let totalIdeas = currentIdeas.concat(newIdeas);
            setIdeas(totalIdeas);
            UpdateIdeasSessionStorage(
              totalIdeas,
              ideasToLoad + parseInt(sessionStorage.getItem("ideasOffset"))
            );
          }
        }
      }
    });
  }

  const [ideas, setIdeas] = useState();
  const [boards, setBoards] = useState();
  const [selectedTab, setSelectedTab] = useState(0);
  const [profile, setProfile] = useState();
  var upperModal = document.getElementById("savedIdeasUpperModalBlock");
  var upperModalBlockHeight = 203;
  if (upperModal) {
    upperModalBlockHeight = upperModal.offsetHeight;
  }
  if (!ideas && !profile) {
    let ideasToLoad = 30;
    GetCurrentProfile((currentProfile) => {
      setProfile(currentProfile);
    });
    GetSavedIdeas(ideasToLoad, 0, (ideas) => {
      setIdeas(ideas);
      UpdateIdeasSessionStorage(JSON.stringify(ideas), ideasToLoad);
    });
  }
  if (!boards) {
    GetCurrentUsersBoards((json) => {
      setBoards(json);
    });
  }

  if (ideas && profile && profile.id != -1)
    return (
      <div
        className="savedIdeasPage"
        style={{
          height: `${window.innerHeight - 80}px`,
        }}
      >
        <div className="upperModalBlock" id="savedIdeasUpperModalBlock">
          <div className="upperHeader">
            <span className="savedIdeasHeader">Ваши сохраненные идеи</span>
            {AspectRatio() >= 1 && (
              <ProfileBlockOnSavedIdeas profile={profile} />
            )}
          </div>
          {AspectRatio() < 1 && <ProfileBlockOnSavedIdeas profile={profile} />}
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
            loadNewIdeasFunc={onScrolledDown}
            visibleScrollSize={window.innerHeight - upperModalBlockHeight - 80}
          ></IdeasScroll>
        )}
        {selectedTab == 1 && (
          <BoardsScroll
            enableDelete={true}
            enableCreateButton={true}
            boards={boards}
            onBoardCreated={onBoardCreated}
            onBoardRemoved={onBoardRemoved}
            visibleScrollSize={window.innerHeight - upperModalBlockHeight - 80}
          ></BoardsScroll>
        )}
      </div>
    );
}
