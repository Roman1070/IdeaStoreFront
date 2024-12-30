import { useState } from "react";
import { GetIdeaSrc, GetLocalImageSrc } from "../utils";
import "./IdeaPreviewPage.css";
import "../IdeaCard/IdeaCard.css";
import SmallRoundButton from "../SmallRoundButton/SmallRoundButton";
import { GetIdea, IsIdeaSaved } from "../requests";
import SaveIdeaButton from "../IdeaCard/SaveIdeaButton";

export default function IdeaPreviewPage() {
  const index = window.location.pathname.substring(6);
  const minPreviewBlockH = window.innerHeight * 0.4;
  const maxPreviewBlockH = window.innerHeight * 0.85;
  const smallButtonsMargin = 6;
  const [idea, setIdea] = useState(null);
  const [saved, setSaved] = useState(false);
  const smallButtonSize = 40;
  if (idea == null) {
    GetIdea(index, (idea) => {
      setIdea(idea);
      IsIdeaSaved(index, (json) => {
        if (Object.hasOwn(json, "err")) {
          alert("internal error checking idea saved: " + json.err);
        } else {
          setSaved(json.saved);
        }
      });
    });
  }

  if (idea)
    return (
      <>
        <div className="previewIdeaBlock">
          <div
            className="previewIdeaImageHolder"
            style={{
              minHeight: `${minPreviewBlockH}px`,
              maxHeight: `${maxPreviewBlockH}px`,
            }}
          >
            <img
              className="previewIdeaBlockImage"
              src={GetIdeaSrc(idea.image)}
            ></img>
          </div>
          <div className="previewIdeaDataBlock">
            <div className="previewIdeaDataHeader">
              <div className="previewImageButtonsGroup">
                <div className="previewImageLikesGroup">
                  <SmallRoundButton
                    size={smallButtonSize}
                    marginRight={smallButtonsMargin}
                    imgSrc={GetLocalImageSrc("heart.png")}
                  ></SmallRoundButton>
                  <div className="likesCount">
                    {idea.likes > 0 && idea.likes}
                  </div>
                </div>
                <SmallRoundButton
                  size={smallButtonSize}
                  marginRight={smallButtonsMargin}
                  imgSrc={GetLocalImageSrc("share.png")}
                ></SmallRoundButton>
                <SmallRoundButton
                  size={smallButtonSize}
                  marginRight={smallButtonsMargin}
                  imgSrc={GetLocalImageSrc("option.png")}
                ></SmallRoundButton>
              </div>
              <div className="previewPageSaveButtonHolder">
                <SaveIdeaButton
                  index={index}
                  saved={saved}
                  onSaved={setSaved}
                ></SaveIdeaButton>
              </div>
            </div>
            <a
              href={idea.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "0 16px",
                textDecoration: "none",
                color: "black",
              }}
            >
              {idea.link}
            </a>
            {<p className="previewIdeaName">{idea.name}</p>}
            <div className="previewIdeaAuthorBlock">
              <img
                className="previewIdeaAuthorAvatar"
                src={GetLocalImageSrc("profileTemp.jpg")}
              ></img>
              <a className="previewIdeaAuthorName">yaro</a>
            </div>
            {idea.link && (
              <a
                className="previewIdeaOpenLinkButton"
                href={idea.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Открыть веб-сайт</span>
              </a>
            )}
            <div className="previewIdeaDescriptionBlock">
              {idea.description}
            </div>
          </div>
        </div>
      </>
    );
}
