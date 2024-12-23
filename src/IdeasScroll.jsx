import IdeaCard from "./IdeaCard/IdeaCard";
import { useState } from "react";

export default function IdeasScroll({ ideas }) {
  var loggedIn = localStorage.getItem("loggedIn");
  if (loggedIn == null) loggedIn = false;
  const [currentCard, setCurrentCard] = useState(null);
  function onMouseEnter(index) {
    if (loggedIn) setCurrentCard(index);
  }

  function onMouseExit(index) {
    if (loggedIn) setCurrentCard(null);
  }
  return (
    <>
      <div className="ideasParent">
        {ideas.map((image) => (
          <IdeaCard
            key={image.index}
            image={image.src}
            onMouseEnter={onMouseEnter}
            onMouseExit={onMouseExit}
            index={image.index}
            isSelected={currentCard == image.index}
          />
        ))}
      </div>
    </>
  );
}
