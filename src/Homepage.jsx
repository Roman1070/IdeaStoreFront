import IdeaCard from "./IdeaCard.jsx";
import NoDraggingLayout from "./NoDraggingLayout.jsx";
import { images, imagesCount } from "./images.js";
import "./Homepage.css";
import { useState } from "react";
import BoardSelector from "./BoardSelector.jsx";
export default function Homepage() {
  const [currentCard, setCurrentCard] = useState(null);
  images = [];
  for (let i = 0; i < 18; i++) {
    images.push({
      src: `images/image${i + 1}.jpg`,
      index: i,
    });
  }

  function onMouseEnter(index) {
    console.log(index);
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
