import { useState } from "react";
import { GetIdea, GetIdeaSrc, GetLocalImageSrc } from "../utils";
import "./IdeaPreviewPage.css";
import "../IdeaCard/IdeaCard.css";
import SmallRoundButton from "../SmallRoundButton/SmallRoundButton";

export default function IdeaPreviewPage() {
  const index = window.location.pathname.substring(6);
  const previewBlockH = window.innerHeight * 0.6;
  const [idea, setIdea] = useState([]);
  const [ideaEmpty, setIdeaEmpty] = useState(true);
  const smallButtonSize = 45;
  if (ideaEmpty) {
    GetIdea(index, (idea) => {
      setIdea(idea);
      setIdeaEmpty(false);
    });
  }
  return (
    <>
      <div className="previewIdeaBlock">
        <div
          className="previewIdeaImageHolder"
          style={{
            height: `${previewBlockH}px`,
          }}
        >
          <img
            className="previewIdeaBlockImage"
            src={GetIdeaSrc(idea.image)}
          ></img>
        </div>
        <div className="previewIdeaDataBlock">
          <div className="previewIdeaDataHeader">
            <div>
              <SmallRoundButton
                size={smallButtonSize}
                imgSrc={GetLocalImageSrc("heart.png")}
              ></SmallRoundButton>
              <SmallRoundButton
                size={smallButtonSize}
                imgSrc={GetLocalImageSrc("share.png")}
              ></SmallRoundButton>
              <SmallRoundButton
                size={smallButtonSize}
                imgSrc={GetLocalImageSrc("option.png")}
              ></SmallRoundButton>
            </div>

            <div className="previewPageSaveButtonHolder">
              <button className="saveButton">Сохранить</button>
            </div>
          </div>
          <a
            href={`http://${idea.link}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0 10px",
            }}
          >
            {idea.link}
          </a>
        </div>
      </div>
    </>
  );
}
