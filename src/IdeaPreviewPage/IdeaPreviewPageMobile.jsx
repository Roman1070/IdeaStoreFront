import { GetImageSrc, GetLocalImageSrc, Morph } from "../utils";
import "./IdeaPreviewPage.css";
import "../IdeaCard/IdeaCard.css";
import SmallRoundButton from "../SmallRoundButton/SmallRoundButton";

import SaveIdeaButton from "../IdeaCard/SaveIdeaButton";
import SelectBoardToSaveButton from "../IdeaCard/SelectBoardToSaveButton";
import IdeaComment from "./IdeaComment";
import IdeaPreviewContentHolder from "./IdeaPreviewContentHolder";
import InputField from "../InputField/InputField";
import IdeaSharingModal from "../IdeaSharingModal/IdeaSharingModal";
import { Link } from "react-router-dom";

export default function IdeaPreviewPageMobile({
  index,
  minPreviewBlockH,
  maxPreviewBlockH,
  smallButtonsMargin,
  currentProfile,
  idea,
  boards,
  saved,
  boardId,
  boardName,
  author,
  comments,
  commentInput,
  commentError,
  showComments,
  showShareModal,
  chats,
  liked,
  likesCount,
  onShareClicked,
  closeShareModal,
  toggleShowComments,
  trySendComment,
  toggleLike,
  smallButtonSize,
  setSelectedBoard,
  onSaveToggle,
  setCommentInput,
  setCommentError,
}) {
  return (
    <div className="previewIdeaBlockMobileWrapper">
      <div className="previewIdeaBlock">
        <div
          className="previewIdeaImageHolderMobile"
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
      </div>
      <div className="previewIdeaDataBlockMobile">
        <div className="previewIdeaDataHeader">
          <div className="previewImageButtonsGroup">
            <div className="previewImageLikesGroup">
              <SmallRoundButton
                size={smallButtonSize}
                marginRight={smallButtonsMargin}
                onClick={toggleLike}
                imgSrc={GetLocalImageSrc(liked ? "heartRed.png" : "heart.png")}
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
              onClick={onShareClicked}
            ></SmallRoundButton>
            {showShareModal && (
              <IdeaSharingModal
                chats={chats}
                idea={idea}
                ideaId={index}
                currentProfile={currentProfile}
                closeFunc={closeShareModal}
              ></IdeaSharingModal>
            )}
            {/* {currentProfile.id != -1 && (
                <SmallRoundButton
                  size={smallButtonSize}
                  marginRight={smallButtonsMargin}
                  imgSrc={GetLocalImageSrc("option.png")}
                ></SmallRoundButton>
              )} */}
          </div>
        </div>
        {currentProfile.id != -1 && (
          <div className="saveButtonBlock">
            {boards && boards.length > 0 && (
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
        <Link
          to={idea.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "0 16px",
            textDecoration: "none",
            color: "black",
            marginTop: "20px",
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
            <Link to={`/my_profile`} className="previewIdeaAuthorName">
              {author.name}
            </Link>
          )}
          {author.id != currentProfile.id && (
            <Link
              to={`/profile/${author.id}`}
              className="previewIdeaAuthorName"
            >
              {author.name}
            </Link>
          )}
        </div>
        {idea.link && (
          <Link
            to={idea.link}
            className="previewIdeaOpenLinkButton"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Открыть веб-сайт</span>
          </Link>
        )}
        <div className="previewIdeaDescriptionBlock">{idea.description}</div>
        {comments && comments.length > 0 && (
          <>
            <div className="commentsHeaderBlock" onClick={toggleShowComments}>
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
  );
}
