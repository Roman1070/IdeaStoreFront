import { AspectRatio } from "../utils";
import IdeaPreviewPage from "./IdeaPreviewPage";
import IdeaPreviewPageMobile from "./IdeaPreviewPageMobile";
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
import { useState } from "react";
export default function IdeaPreviewPageWrapper() {
  const index = window.location.pathname.substring(6);
  const minPreviewBlockH = window.innerHeight * 0.4;
  const maxPreviewBlockH = window.innerHeight * 0.85;
  const smallButtonsMargin = 6;
  const [currentProfile, setCurrentProfile] = useState();
  const [idea, setIdea] = useState();
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

  if (idea && author) {
    if (AspectRatio() > 1)
      return (
        <IdeaPreviewPage
          index={index}
          minPreviewBlockH={minPreviewBlockH}
          maxPreviewBlockH={maxPreviewBlockH}
          smallButtonsMargin={smallButtonsMargin}
          currentProfile={currentProfile}
          idea={idea}
          boards={boards}
          saved={saved}
          boardId={boardId}
          boardName={boardName}
          author={author}
          comments={comments}
          commentInput={commentInput}
          commentError={commentError}
          showComments={showComments}
          showShareModal={showShareModal}
          chats={chats}
          liked={liked}
          likesCount={likesCount}
          smallButtonSize={smallButtonSize}
          onShareClicked={() => setShowShareModal(!showShareModal)}
          closeShareModal={() => setShowShareModal(false)}
          toggleShowComments={toggleShowComments}
          trySendComment={trySendComment}
          toggleLike={toggleLike}
          setSelectedBoard={setSelectedBoard}
          onSaveToggle={onSaveToggle}
          setCommentError={setCommentError}
          setCommentInput={setCommentInput}
        />
      );
    else
      return (
        <IdeaPreviewPageMobile
          index={index}
          minPreviewBlockH={minPreviewBlockH}
          maxPreviewBlockH={maxPreviewBlockH}
          smallButtonsMargin={smallButtonsMargin}
          currentProfile={currentProfile}
          idea={idea}
          boards={boards}
          saved={saved}
          boardId={boardId}
          boardName={boardName}
          author={author}
          comments={comments}
          commentInput={commentInput}
          commentError={commentError}
          showComments={showComments}
          showShareModal={showShareModal}
          chats={chats}
          liked={liked}
          likesCount={likesCount}
          smallButtonSize={smallButtonSize}
          onShareClicked={() => setShowShareModal(!showShareModal)}
          closeShareModal={() => setShowShareModal(false)}
          toggleShowComments={toggleShowComments}
          trySendComment={trySendComment}
          toggleLike={toggleLike}
          setSelectedBoard={setSelectedBoard}
          onSaveToggle={onSaveToggle}
          setCommentError={setCommentError}
          setCommentInput={setCommentInput}
        />
      );
  }
}
