import { useState } from "react";
import { GetIdeaSrc, GetLocalImageSrc } from "../utils";
import "./IdeaPreviewPage.css";
import "../IdeaCard/IdeaCard.css";
import SmallRoundButton from "../SmallRoundButton/SmallRoundButton";
import {
  GetIdea,
  GetProfile,
  GetCurrentUsersBoards,
  IsIdeaSaved,
} from "../requests";
import SaveIdeaButton from "../IdeaCard/SaveIdeaButton";
import SelectBoardToSaveButton from "../IdeaCard/SelectBoardToSaveButton";

export default function IdeaPreviewPage() {
  const index = window.location.pathname.substring(6);
  const minPreviewBlockH = window.innerHeight * 0.4;
  const maxPreviewBlockH = window.innerHeight * 0.85;
  const smallButtonsMargin = 6;
  const [idea, setIdea] = useState(null);
  const [boards, setBoards] = useState([]);
  const [saved, setSaved] = useState(false);
  const [boardId, setBoardId] = useState();
  const [boardName, setBoardName] = useState();
  const [author, setAuthor] = useState();
  function onSaveToggle(savedNow) {
    setSaved(savedNow);
  }
  function setSelectedBoard(id) {
    setBoardId(id);
  }
  function getBoardName(boards, id) {
    for (var i = 0; i < boards.length; i++) {
      if (boards[i].id == id) return boards[i].name;
    }
    return "Профиль";
  }
  const smallButtonSize = 40;
  if (idea == null && boards.length == 0) {
    GetCurrentUsersBoards((b) => {
      GetIdea(index, (idea) => {
        GetProfile(idea.userId, (profile) => {
          setAuthor(profile);
          setBoards(b);
          setIdea(idea);
          console.log(idea);
          IsIdeaSaved(index, (json) => {
            if (Object.hasOwn(json, "err")) {
              alert("internal error checking idea saved: " + json.err);
            } else {
              setSaved(json.saved);
              setBoardId(Number(json.boardId));

              setBoardName(getBoardName(b, Number(json.boardId)));
            }
          });
        });
      });
    });
  }

  if (idea && author)
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
              <div className="saveButtonBlock">
                {boards.length > 0 && (
                  <div className="previewPageSelectBoardButtonHolder">
                    <SelectBoardToSaveButton
                      saved={saved}
                      setSelectedBoard={setSelectedBoard}
                      availableBoards={boards}
                      startBoardId={boardId}
                      startBoardName={boardName}
                    ></SelectBoardToSaveButton>
                  </div>
                )}
                <div className="previewPageSaveButtonHolder">
                  <SaveIdeaButton
                    onSaved={onSaveToggle}
                    saved={saved}
                    board={boardId}
                    index={index}
                  ></SaveIdeaButton>
                </div>
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
              <a
                href={`/profile/${author.id}`}
                className="previewIdeaAuthorName"
              >
                {author.name}
              </a>
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
