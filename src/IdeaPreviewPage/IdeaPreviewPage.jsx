import { useState } from "react";
import { GetIdeaSrc, GetLocalImageSrc, Morph } from "../utils";
import "./IdeaPreviewPage.css";
import "../IdeaCard/IdeaCard.css";
import SmallRoundButton from "../SmallRoundButton/SmallRoundButton";
import {
  GetIdea,
  GetProfile,
  GetCurrentUsersBoards,
  IsIdeaSaved,
  GetComments,
} from "../requests";
import SaveIdeaButton from "../IdeaCard/SaveIdeaButton";
import SelectBoardToSaveButton from "../IdeaCard/SelectBoardToSaveButton";
import IdeaComment from "./IdeaComment";

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
  const [comments, setComments] = useState();
  const [commentInput, setCommentInput] = useState();
  const inputBlock = document.getElementById("enterCommentInput");
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
  function onCommentChange(event) {
    var comment = event.target.innerHTML;
    if (comment.length > 200) {
      comment = comment.substring(0, 200);
    }
    setCommentInput(comment);
    if (inputBlock) {
      inputBlock.innerHTML = comment;
      var range = document.createRange(); //Create a range (a range is a like the selection but invisible)
      range.selectNodeContents(inputBlock); //Select the entire contents of the element with the range
      range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
      var selection = window.getSelection(); //get the selection object (allows you to change selection)
      selection.removeAllRanges(); //remove any selections already made
      selection.addRange(range);
    }
  }
  const smallButtonSize = 40;
  if (idea == null && boards.length == 0) {
    GetCurrentUsersBoards((b) => {
      GetIdea(index, (idea) => {
        GetProfile(idea.userId, (profile) => {
          GetComments(index, (commentsJson) => {
            setComments(commentsJson);
            console.log(commentsJson);
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
            {comments && comments.length > 0 && (
              <>
                <div className="commentsHeaderBlock">
                  <span className="commentsCountText">
                    {comments.length}{" "}
                    {Morph(comments.length, [
                      "комментарий",
                      "комментария",
                      "комментариев",
                    ])}
                  </span>
                  <img
                    style={{
                      margin: "auto 0",
                      height: "30px",
                      widows: "30px",
                    }}
                    src={GetLocalImageSrc("downArrowBlack.png")}
                  ></img>
                </div>
                <div>
                  {comments.map((comment) => (
                    <IdeaComment
                      comment={comment}
                      key={comment.id}
                    ></IdeaComment>
                  ))}
                </div>
              </>
            )}
            <div className="enterCommentBlock">
              <div
                contentEditable
                onInput={onCommentChange}
                id="enterCommentInput"
                className="enterCommentInput"
              ></div>
            </div>
          </div>
        </div>
      </>
    );
}
