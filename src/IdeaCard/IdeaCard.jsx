import { useEffect } from "react";
import "./IdeaCard.css";
import { GetCookie, GetIdeaSrc } from "../utils";
import SaveIdeaButton from "./SaveIdeaButton";
const HostName = "http://localhost:8182/images/";
export default function IdeaCard({
  idea,
  onMouseEnter,
  onMouseExit,
  index,
  isSelected,
}) {
  function onSaveToggle(savedNow) {}
  var loggedIn = GetCookie("token");
  return (
    <div
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseExit(index)}
      className={"ideaCard" + (isSelected ? " activeIdeaCard" : "")}
    >
      <img
        src={GetIdeaSrc(idea.image)}
        alt={idea.image}
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
          <SaveIdeaButton
            onClickAction={onSaveToggle}
            idea={idea}
          ></SaveIdeaButton>
        </>
      )}
    </div>
  );
}
