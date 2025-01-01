import { useEffect, useState } from "react";
import "./IdeaCard.css";
import { GetCookie, GetIdeaSrc } from "../utils";
import SaveIdeaButton from "./SaveIdeaButton";
import SelectBoardToSaveButton from "./SelectBoardToSaveButton";

export default function IdeaCard({
  idea,
  onMouseEnter,
  onMouseExit,
  index,
  isSelected,
  savedDefault,
  availableBoards,
}) {
  const [saved, setSaved] = useState(savedDefault);
  const [boardId, setBoardId] = useState(-1);
  function onSaveToggle(savedNow) {
    setSaved(savedNow);
  }
  function setSelectedBoard(id) {
    setBoardId(id);
  }
  var loggedIn = GetCookie("token");
  return (
    <div
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseExit(index)}
      className={"ideaCard" + (isSelected ? " activeIdeaCard" : "")}
    >
      <img
        src={GetIdeaSrc(idea.image)}
        alt={idea.image}
        content="image"
        style={{ width: "100%", borderRadius: "20px" }}
      />
      {loggedIn && (
        <a
          href={"/idea/" + index}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            cursor: "pointer",
            display: "inline-block",
            zIndex: "3",
          }}
        ></a>
      )}
      {isSelected && (
        <>
          <div className="ideaCardFade"></div>
          {availableBoards && (
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
          <div className="saveButtonHolder">
            <SaveIdeaButton
              onSaved={onSaveToggle}
              saved={saved}
              board={boardId}
              index={index}
            ></SaveIdeaButton>
          </div>
        </>
      )}
    </div>
  );
}
