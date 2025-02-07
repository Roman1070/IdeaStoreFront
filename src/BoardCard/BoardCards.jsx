import { Link, useSearchParams } from "react-router-dom";
import { DeleteBoard, GetIdea, GetIdeasInBoard } from "../requests";
import "./BoardCard.css";
import { useState } from "react";
import { GetImageSrc, GetLocalImageSrc, Morph } from "../utils";
import IdeaPreviewContentHolder from "../IdeaPreviewPage/IdeaPreviewContentHolder";

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
            <div className="left">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <IdeaPreviewContentHolder
                  height="100%"
                  image={ideas[0].image}
                ></IdeaPreviewContentHolder>
              </div>
            </div>
          )}
          {ideas && ideas.length > 1 && (
            <div className="upper">
              <IdeaPreviewContentHolder
                image={ideas[1].image}
              ></IdeaPreviewContentHolder>
            </div>
          )}
          {ideas && ideas.length > 2 && (
            <div className="lower">
              <IdeaPreviewContentHolder
                image={ideas[2].image}
              ></IdeaPreviewContentHolder>
            </div>
          )}
          {isActive && enableDelete && (
            <div className="deleteBoardButton" onClick={deleteBoard}>
              <img
                className="deleteBoardButtonImage"
                src={GetLocalImageSrc("delete.png")}
              ></img>
            </div>
          )}
        </div>
        <span className="boardCardName">{boardData.name}</span>
        <span className="boardCardIdeasCount">
          {ideas && ideas.length} {ideas && Morph(ideas.length)}
        </span>
        <Link
          replace
          to={`/board/${boardData.id}`}
          className="boardLink"
        ></Link>
      </div>
    );
}
