import { useState } from "react";
import { GetImageSrc, GetLocalImageSrc, Morph } from "../utils";
import "./IdeaPreviewPage.css";
import "../IdeaCard/IdeaCard.css";
import SmallRoundButton from "../SmallRoundButton/SmallRoundButton";
import {
  GetIdea,
  GetProfile,
  GetCurrentUsersBoards,
  IsIdeaSaved,
  GetComments,
  CreateComment,
  GetCurrentProfile,
  GetChats,
  ToggleLike,
  IsIdeaLiked,
} from "../requests";
import SaveIdeaButton from "../IdeaCard/SaveIdeaButton";
import SelectBoardToSaveButton from "../IdeaCard/SelectBoardToSaveButton";
import IdeaComment from "./IdeaComment";
import IdeaPreviewContentHolder from "./IdeaPreviewContentHolder";
import InputField from "../InputField/InputField";
import IdeaSharingModal from "../IdeaSharingModal/IdeaSharingModal";
import { Link } from "react-router-dom";

export default function IdeaPreviewPage() {
  const index = window.location.pathname.substring(6);
  const minPreviewBlockH = window.innerHeight * 0.4;
  const maxPreviewBlockH = window.innerHeight * 0.85;
  const smallButtonsMargin = 6;
  const [currentProfile, setCurrentProfile] = useState();
  const [idea, setIdea] = useState(null);
  const [boards, setBoards] = useState([]);
  const [saved, setSaved] = useState(false);
  const [boardId, setBoardId] = useState();
  const [boardName, setBoardName] = useState();
  const [author, setAuthor] = useState();
  const [comments, setComments] = useState();
  const [commentInput, setCommentInput] = useState();
  const [commentError, setCommentError] = useState();
  const [showComments, setShowComments] = useState();
  const [showShareModal, setShowShareModal] = useState();
  const [chats, setChats] = useState();
  const [liked, setLiked] = useState();
  const [likesCount, setLikesCount] = useState();
  function toggleLike() {
    if (currentProfile && currentProfile.id != -1)
      ToggleLike(index, (resp) => {
        setLiked(resp.nowLiked);
        setLikesCount(resp.likesCount);
      });
  }
  function toggleShowComments() {
    setShowComments(!showComments);
  }
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
  function trySendComment() {
    if (!commentInput) {
      setCommentError("Comment mustn't be empty");
      return;
    }

    CreateComment(index, commentInput, () => {
      setCommentInput("");

      GetComments(index, (commentsJson) => {
        setComments(commentsJson);
      });
    });
  }

  const smallButtonSize = 40;
  if (!idea && boards.length == 0) {
    GetCurrentProfile((prof) => {
      if (prof.id != -1) {
        GetCurrentUsersBoards((b) => {
          GetIdea(index, (idea) => {
            GetProfile(idea.userId, (author) => {
              GetComments(index, (commentsJson) => {
                GetChats((chatsJson) => {
                  setChats(chatsJson);
                  setComments(commentsJson);
                  setAuthor(author);
                  setBoards(b);
                  setIdea(idea);
                  setCurrentProfile(prof);
                  IsIdeaLiked(index, (json) => {
                    setLiked(json.liked);
                  });
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
        });
      } else {
        GetIdea(index, (idea) => {
          GetComments(index, (comments) => {
            GetProfile(idea.userId, (author) => {
              setIdea(idea);
              setAuthor(author);
              setComments(comments);
              setCurrentProfile(prof);
            });
          });
        });
      }
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
            <IdeaPreviewContentHolder
              image={idea.image}
              controls
            ></IdeaPreviewContentHolder>
          </div>
          <div className="previewIdeaDataBlock">
            <div className="previewIdeaDataHeader">
              <div className="previewImageButtonsGroup">
                <div className="previewImageLikesGroup">
                  <SmallRoundButton
                    size={smallButtonSize}
                    marginRight={smallButtonsMargin}
                    onClick={toggleLike}
                    imgSrc={GetLocalImageSrc(
                      liked ? "heartRed.png" : "heart.png"
                    )}
                  ></SmallRoundButton>
                  <div className="likesCount">
                    {likesCount && likesCount > 0 && likesCount}
                    {!likesCount && idea.likes > 0 && idea.likes}
                  </div>
                </div>
                <SmallRoundButton
                  size={smallButtonSize}
                  marginRight={smallButtonsMargin}
                  imgSrc={GetLocalImageSrc(
                    showShareModal ? "shareBlack.png" : "share.png"
                  )}
                  onClick={() => setShowShareModal(!showShareModal)}
                ></SmallRoundButton>
                {currentProfile.id != -1 && showShareModal && (
                  <IdeaSharingModal
                    chats={chats}
                    idea={idea}
                    ideaId={index}
                    currentProfile={currentProfile}
                  ></IdeaSharingModal>
                )}
                <SmallRoundButton
                  size={smallButtonSize}
                  marginRight={smallButtonsMargin}
                  imgSrc={GetLocalImageSrc("option.png")}
                ></SmallRoundButton>
              </div>
              {boards && (
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
              )}
            </div>
            <Link
              replace
              to={idea.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "0 16px",
                textDecoration: "none",
                color: "black",
              }}
            >
              {idea.link}
            </Link>
            {<p className="previewIdeaName">{idea.name}</p>}
            <div className="previewIdeaAuthorBlock">
              <img
                style={{
                  borderRadius: "999px",
                }}
                className="previewIdeaAuthorAvatar"
                src={
                  author.avatarImage
                    ? GetImageSrc(author.avatarImage)
                    : GetLocalImageSrc("user.png")
                }
              ></img>
              {author.id == currentProfile.id && (
                <Link
                  replace
                  to={`/my_profile`}
                  className="previewIdeaAuthorName"
                >
                  {author.name}
                </Link>
              )}
              {author.id != currentProfile.id && (
                <Link
                  replace
                  to={`/profile/${author.id}`}
                  className="previewIdeaAuthorName"
                >
                  {author.name}
                </Link>
              )}
            </div>
            {idea.link && (
              <Link
                replace
                className="previewIdeaOpenLinkButton"
                to={idea.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Открыть веб-сайт</span>
              </Link>
            )}
            <div className="previewIdeaDescriptionBlock">
              {idea.description}
            </div>
            {comments && comments.length > 0 && (
              <>
                <div
                  className="commentsHeaderBlock"
                  onClick={toggleShowComments}
                >
                  <span className="commentsCountText">
                    {comments.length}{" "}
                    {Morph(comments.length, [
                      "комментарий",
                      "комментария",
                      "комментариев",
                    ])}
                  </span>
                  <SmallRoundButton
                    imgSrc={GetLocalImageSrc("downArrowBlack.png")}
                    size={40}
                    onClick={toggleShowComments}
                  ></SmallRoundButton>
                </div>
                {showComments && (
                  <div className="commentsBlock" id="commentsBlock">
                    {comments.map((comment) => (
                      <IdeaComment
                        comment={comment}
                        key={comment.id}
                        currentId={currentProfile.id}
                      ></IdeaComment>
                    ))}
                  </div>
                )}
              </>
            )}
            {currentProfile.id != -1 && (
              <div className="enterCommentBlock">
                <div
                  style={{
                    flex: "1",
                    margin: "0 10px",
                  }}
                >
                  <InputField
                    value={commentInput}
                    isCorrect={!commentError}
                    error={commentError}
                    onChangeAction={(value) => {
                      setCommentInput(value);
                      setCommentError("");
                    }}
                    height={"24px"}
                  ></InputField>
                </div>

                <div
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <SmallRoundButton
                    marginRight={16}
                    size={40}
                    imgSrc={GetLocalImageSrc("sendMessage.png")}
                    onClick={trySendComment}
                  ></SmallRoundButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
}
