import { useEffect } from "react";
import "./IdeaCard.css";

export default function IdeaCard({
  image,
  onMouseEnter,
  onMouseExit,
  index,
  isSelected,
}) {
  return (
    <div
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseExit(index)}
      className={"ideaCard" + (isSelected ? " activeIdeaCard" : "")}
      style={{
        backgroundImage: { image },
      }}
    >
      <img
        src={"http://localhost:8182/images/" + image}
        alt={image}
        content="image"
        style={{ width: "100%", borderRadius: "20px" }}
      />
      {isSelected && (
        <>
          <div className="ideaCardFade"></div>
          <div
            style={{
              position: "absolute",
              width: "130px",
              height: "55px",
              top: "10px",
              right: "10px",
              zIndex: "3",
            }}
          >
            <button className="saveButton">Сохранить</button>
          </div>
        </>
      )}
    </div>
  );
}
