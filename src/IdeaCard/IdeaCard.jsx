import { useEffect } from "react";
import "./IdeaCard.css";
import { GetCookie, GetIdeaSrc } from "../utils";
const HostName = "http://localhost:8182/images/";
export default function IdeaCard({
  image,
  onMouseEnter,
  onMouseExit,
  index,
  isSelected,
}) {
  var loggedIn = GetCookie("token");
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
        src={GetIdeaSrc(image)}
        alt={image}
        content="image"
        style={{ width: "100%", borderRadius: "20px" }}
      />
      {loggedIn && (
        <a
          href={"/idea/" + index}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            cursor: "pointer",
            display: "inline-block",
            zIndex: "3",
          }}
        ></a>
      )}
      {isSelected && (
        <>
          <div className="ideaCardFade"></div>
          <div className="saveButtonHolder" style={{}}>
            <button className="saveButton">Сохранить</button>
          </div>
        </>
      )}
    </div>
  );
}
