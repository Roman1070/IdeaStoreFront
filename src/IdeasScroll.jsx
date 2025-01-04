import IdeaCard from "./IdeaCard/IdeaCard";
import { useState } from "react";
import { GetCookie } from "./utils";

export default function IdeasScroll({
  ideas,
  saved,
  availableBoards,
  startBoardId,
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
