import { useState } from "react";
import { GetImageSrc, GetLocalImageSrc, JoinReactHostAddress } from "../utils";
import "./IdeaPreviewPage.css";
import { Link } from "react-router-dom";
export default function IdeaComment({ comment, currentId }) {
  return (
    <div className="ideaComment">
      <img
        style={{
          borderRadius: "999px",
        }}
        className="ideaCommentAvatar"
        src={
          comment.avatar
            ? GetImageSrc(comment.avatar)
            : GetLocalImageSrc("user.png")
        }
      ></img>
      <div className="ideaCommentContent">
        <div className="ideaCommentUpperContent">
          {currentId == comment.userId && (
            <Link
              to={JoinReactHostAddress(`my_profile`)}
              className="ideaCommentAuthorName"
            >
              {comment.username}
            </Link>
          )}
          {currentId != comment.userId && (
            <Link
              to={JoinReactHostAddress(`profile/${comment.userId}`)}
              className="ideaCommentAuthorName"
            >
              {comment.username}
            </Link>
          )}

          <span className="ideaCommentText">{comment.text}</span>
        </div>
        <div className="ideaCommentLowerContent"></div>
      </div>
    </div>
  );
}
