import IdeaCard from "./IdeaCard/IdeaCard";
import { useState } from "react";
import { GetCookie } from "./utils";
import "./IdeasScroll.css";
export default function IdeasScroll({
  ideas,
  saved,
  availableBoards,
  startBoardId,
  disableSave,
}) {
  var loggedIn = GetCookie("token");

  const [currentCard, setCurrentCard] = useState(null);
  function onMouseEnter(index) {
    if (loggedIn != null) setCurrentCard(index);
  }

  function onMouseExit(index) {
    if (loggedIn != null) setCurrentCard(null);
  }

  return (
    <>
      <div className="ideasParent">
        {ideas &&
          ideas.map((idea) => (
            <IdeaCard
              key={idea.id}
              disableSave={disableSave}
              idea={idea}
              onMouseEnter={onMouseEnter}
              onMouseExit={onMouseExit}
              index={idea.id}
              availableBoards={availableBoards}
              savedDefault={idea.saved || saved}
              isSelected={currentCard == idea.id}
              board={idea.board || startBoardId}
            />
          ))}
      </div>
    </>
  );
}
