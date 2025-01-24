import { useState } from "react";
import { GetImageSrc, GetLocalImageSrc, JoinReactHostAddress } from "../utils";
import "./IdeaPreviewPage.css";
import { GetCurrentProfile } from "../requests";
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
            <a
              href={JoinReactHostAddress(`my_profile`)}
              className="ideaCommentAuthorName"
            >
              {comment.username}
            </a>
          )}
          {currentId != comment.userId && (
            <a
              href={JoinReactHostAddress(`profile/${comment.userId}`)}
              className="ideaCommentAuthorName"
            >
              {comment.username}
            </a>
          )}

          <span className="ideaCommentText">{comment.text}</span>
        </div>
        <div className="ideaCommentLowerContent"></div>
      </div>
    </div>
  );
}
