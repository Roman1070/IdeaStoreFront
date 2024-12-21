import IdeaCard from "./IdeaCard/IdeaCard";
import { useState } from "react";

export default function IdeasScroll({ images }) {
  const [currentCard, setCurrentCard] = useState(null);
  function onMouseEnter(index) {
    setCurrentCard(index);
  }

  function onMouseExit(index) {
    setCurrentCard(null);
  }
  return (
    <>
      <div className="ideasParent">
        {images.map((image) => (
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
