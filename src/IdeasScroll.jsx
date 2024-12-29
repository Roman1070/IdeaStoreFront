import IdeaCard from "./IdeaCard/IdeaCard";
import { useState } from "react";
import { GetCookie } from "./utils";

export default function IdeasScroll({ ideas }) {
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
              image={idea.image}
              onMouseEnter={onMouseEnter}
              onMouseExit={onMouseExit}
              index={idea.id}
              isSelected={currentCard == idea.id}
            />
          ))}
      </div>
    </>
  );
}
