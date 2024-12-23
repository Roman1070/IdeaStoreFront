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
        src={image}
        alt={image}
        style={{ width: "100%", borderRadius: "20px" }}
      />
      <div className="ideaCardFade"></div>
      {isSelected && (
        <>
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
