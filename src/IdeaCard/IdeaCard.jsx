import { useEffect, useState } from "react";
import "./IdeaCard.css";
import { GetCookie, GetImageSrc } from "../utils";
import SaveIdeaButton from "./SaveIdeaButton";
import SelectBoardToSaveButton from "./SelectBoardToSaveButton";
import IdeaPreviewContentHolder from "../IdeaPreviewPage/IdeaPreviewContentHolder";
import { Link } from "react-router-dom";

export default function IdeaCard({
  idea,
  onMouseEnter,
  onMouseExit,
  index,
  isSelected,
  savedDefault,
  availableBoards,
  board,
  disableSave,
  margin,
  width,
}) {
  const [saved, setSaved] = useState(savedDefault);
  const [boardId, setBoardId] = useState(board ? board : -1);
  function onSaveToggle(savedNow) {
    setSaved(savedNow);
  }
  function setSelectedBoard(id) {
    setBoardId(id);
  }

  return (
    <div
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseExit(index)}
      className={"ideaCard" + (isSelected ? " activeIdeaCard" : "")}
      style={{
        margin: margin,
        width: width,
      }}
    >
      <div
        style={{
          width: "100%",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <IdeaPreviewContentHolder
          expandY={true}
          image={idea.image}
        ></IdeaPreviewContentHolder>
      </div>
      <Link
        to={"/idea/" + index}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          cursor: "pointer",
          display: "inline-block",
          zIndex: "3",
        }}
      ></Link>
      {isSelected && (
        <>
          <div className="ideaCardFade"></div>
          {availableBoards && !disableSave && (
            <div className="selectBoardButtonHolder">
              <SelectBoardToSaveButton
                saved={saved}
                setSelectedBoard={setSelectedBoard}
                availableBoards={availableBoards}
                startBoardId={boardId}
                reverseColors={true}
              ></SelectBoardToSaveButton>
            </div>
          )}
          {!disableSave && (
            <div className="saveButtonHolder">
              <SaveIdeaButton
                onSaved={onSaveToggle}
                saved={saved}
                board={boardId}
                index={index}
              ></SaveIdeaButton>
            </div>
          )}
        </>
      )}
    </div>
  );
}
