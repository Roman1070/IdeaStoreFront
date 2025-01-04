import { useState } from "react";
import "./BoardPreviewPage.css";
import { GetBoard, GetIdeas } from "../requests";
import { MorphIdea } from "../utils";
import IdeasScroll from "../IdeasScroll";
export default function BoardPreviewPage() {
  const id = window.location.pathname.substring(7);
  const [board, setBoard] = useState();
  const [ideas, setIdeas] = useState();

  if (board == null && ideas == null) {
    GetBoard(id, (boardJson) => {
      GetIdeas(boardJson.ideasIds, (ideasJson) => {
        console.log(ideasJson);
        setBoard(boardJson);
        setIdeas(ideasJson);
      });
    });
  }
  if (board != null && ideas != null)
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
              {ideas.length + " " + MorphIdea(ideas.length)}
            </span>
          </div>
        </div>
        <IdeasScroll saved={true} ideas={ideas} startBoardId={id}></IdeasScroll>
      </>
    );
}
