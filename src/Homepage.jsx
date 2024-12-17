import IdeaCard from "./IdeaCard.jsx";
import NoDraggingLayout from "./NoDraggingLayout.jsx";
import { imgs, imagesCount } from "./images.js";
import "./Homepage.css";
import BoardSelector from "./BoardSelector.jsx";
export default function Homepage() {
  imgs = [];
  for (let i = 0; i < 18; i++) {
    imgs.push(`images/image${i + 1}.jpg`);
  }

  function onMouseEnter(card) {
    console.log("card mouse enter");
  }
  return (
    <>
      <BoardSelector></BoardSelector>
      <div className="ideasParent">
        {imgs.map((image) => (
          <IdeaCard key={image} image={image} onMouseEnter={onMouseEnter} />
        ))}
      </div>
    </>
  );
}
