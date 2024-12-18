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
        display: "flex",
        height: "max-content",
        justifyContent: "center",
        backgroundImage: { image },
        position: "relative",
      }}
    >
      {isSelected && (
        <>
          <img
            src={image}
            alt={image}
            style={{
              width: "100%",
              borderRadius: "20px",
              color: "#000",
              opacity: 0.3,
              zIndex: "1",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "130px",
              height: "55px",
              top: "10px",
              right: "10px",
              zIndex: "5",
            }}
          >
            <button className="saveButton">Сохранить</button>
          </div>
        </>
      )}
      {!isSelected && (
        <img
          src={image}
          alt={image}
          style={{ width: "100%", borderRadius: "20px" }}
        />
      )}
    </div>
  );
}
