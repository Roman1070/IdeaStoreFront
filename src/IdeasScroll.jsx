import IdeaCard from "./IdeaCard/IdeaCard";
import { useState } from "react";

export default function IdeasScroll({ ideas }) {
  var loggedIn = localStorage.getItem("loggedIn");
  if (loggedIn == null) loggedIn = "false";
  const [currentCard, setCurrentCard] = useState(null);
  function onMouseEnter(index) {
    if (loggedIn == "true") setCurrentCard(index);
  }

  function onMouseExit(index) {
    if (loggedIn == "true") setCurrentCard(null);
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
              isSelected={currentCard == idea.index}
            />
          ))}
      </div>
    </>
  );
}
