import { useSearchParams } from "react-router-dom";
import { DeleteBoard, GetIdea, GetIdeasInBoard } from "../requests";
import "./BoardCard.css";
import { useState } from "react";
import {
  GetIdeaSrc,
  GetLocalImageSrc,
  JoinClientAddress,
  JoinReactHostAddress,
  MorphIdea,
} from "../utils";

export default function BoardCard({
  boardData,
  isActive,
  onMouseEnter,
  onMouseExit,
  onClick,
  isCreateCard,
  refreshFunc,
  enableDelete,
}) {
  function deleteBoard() {
    DeleteBoard(boardData.id, refreshFunc);
  }
  const [ideas, setIdeas] = useState();
  if (!isCreateCard && ideas == null) {
    GetIdeasInBoard(boardData.id, (json) => {
      setIdeas(json);
    });
  }
  if (isCreateCard) {
    return (
      <div
        className="boardCard"
        onMouseEnter={() => onMouseEnter(0)}
        onMouseLeave={() => onMouseExit(0)}
        onClick={() => onClick()}
      >
        <div className="boardCardImageHolder">
          {isActive && <div className="boardCardFade"></div>}
          <img
            style={{
              width: "50px",
              height: "50px",
              display: "flex",
              margin: "auto auto",
              flexDirection: "row",
            }}
            src={GetLocalImageSrc("plus.png")}
          ></img>
        </div>
        <span className="boardCardName">Новая доска</span>
      </div>
    );
  } else if (!isCreateCard && boardData != null)
    return (
      <div
        className="boardCard"
        onMouseEnter={() => onMouseEnter(boardData.id)}
        onMouseLeave={() => onMouseExit(boardData.id)}
      >
        <div className="boardCardImageHolder">
          {isActive && <div className="boardCardFade"></div>}
          {ideas && ideas.length > 0 && (
            <img className="left" src={GetIdeaSrc(ideas[0].image)}></img>
          )}
          {ideas && ideas.length > 1 && (
            <div className="upper">
              <img
                style={{
                  width: "100%",
                }}
                src={GetIdeaSrc(ideas[1].image)}
              ></img>
            </div>
          )}
          {ideas && ideas.length > 2 && (
            <div className="lower">
              <img
                style={{
                  width: "100%",
                }}
                src={GetIdeaSrc(ideas[2].image)}
              ></img>
            </div>
          )}
        </div>
        <span className="boardCardName">{boardData.name}</span>
        <span className="boardCardIdeasCount">
          {ideas && ideas.length} {ideas && MorphIdea(ideas.length)}
        </span>
        <a
          href={JoinReactHostAddress(`board/${boardData.id}`)}
          className="boardLink"
        ></a>
        {isActive && enableDelete && (
          <div className="deleteBoardButton" onClick={deleteBoard}>
            <img
              className="deleteBoardButtonImage"
              src={GetLocalImageSrc("delete.png")}
            ></img>
          </div>
        )}
      </div>
    );
}
