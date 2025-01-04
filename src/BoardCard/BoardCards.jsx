import { useSearchParams } from "react-router-dom";
import { GetIdea, GetIdeasInBoard } from "../requests";
import "./BoardCard.css";
import { useState } from "react";
import { GetIdeaSrc, MorphIdea } from "../utils";

export default function BoardCard({
  boardData,
  isActive,
  onMouseEnter,
  onMouseExit,
}) {
  const [ideas, setIdeas] = useState();
  if (ideas == null) {
    GetIdeasInBoard(boardData.id, (json) => {
      setIdeas(json);
    });
  }
  if (ideas != null)
    return (
      <div
        className="boardCard"
        onMouseEnter={() => onMouseEnter(boardData.id)}
        onMouseLeave={() => onMouseExit(boardData.id)}
      >
        <div className="boardCardImageHolder">
          {isActive && <div className="boardCardFade"></div>}
          <img className="left" src={GetIdeaSrc(ideas[0].image)}></img>
          {ideas.length > 1 && (
            <div className="upper">
              <img
                style={{
                  width: "100%",
                }}
                src={GetIdeaSrc(ideas[1].image)}
              ></img>
            </div>
          )}
          {ideas.length > 2 && (
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
          {ideas.length} {MorphIdea(ideas.length)}
        </span>
        <a href={`board/${boardData.id}`} className="boardLink"></a>
      </div>
    );
}
