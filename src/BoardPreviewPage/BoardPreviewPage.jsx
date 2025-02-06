import { useState } from "react";
import "./BoardPreviewPage.css";
import { GetBoard, GetIdeas, GetIdeasInBoard, IsIdeaSaved } from "../requests";
import { Morph } from "../utils";
import IdeasScroll from "../IdeasScroll";
export default function BoardPreviewPage() {
  const id = window.location.pathname.substring(7);
  const [board, setBoard] = useState();
  const [ideas, setIdeas] = useState();

  if (!board && !ideas) {
    GetBoard(id, (boardJson) => {
      GetIdeasInBoard(boardJson.id, (ideasJson) => {
        setBoard(boardJson);
        setIdeas(ideasJson);
      });
    });
  }
  console.log(ideas);
  if (board != null)
    return (
      <>
        <div className="boardPreviewPageHeader">
          <div className="boardPreviewPageHeaderLeft">
            <span
              style={{
                fontSize: "32px",
                fontWeight: "600",
                marginBottom: "10px",
              }}
            >
              {board.name}
            </span>
            <span style={{}}>
              {ideas && ideas.length + " " + Morph(ideas.length)}
              {!ideas && "0 идей"}
            </span>
          </div>
        </div>
        {ideas && (
          <IdeasScroll
            disableSave={true}
            ideas={ideas}
            startBoardId={id}
          ></IdeasScroll>
        )}
      </>
    );
}
