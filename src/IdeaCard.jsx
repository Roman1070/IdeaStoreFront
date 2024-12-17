import { useEffect } from "react";
import "./IdeaCard.css";

export default function IdeaCard({ image, onMouseEnter }) {
  return (
    <div
      onMouseEnter={() => onMouseEnter()}
      className="ideaCard"
      style={{
        display: "flex",
        height: "max-content",
        justifyContent: "center",
        backgroundImage: { image },
      }}
    >
      <img
        src={image}
        alt={image}
        style={{ width: "100%", borderRadius: "20px" }}
      />
    </div>
  );
}
