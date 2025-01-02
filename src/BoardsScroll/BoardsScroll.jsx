import { useState } from "react";
import BoardCard from "../BoardCard/BoardCards";
import "./BoardsScroll.css";

export default function BoardsScroll({ boards }) {
  const [currentBoard, setCurrentBoard] = useState(null);
  function onMouseEnter(index) {
    setCurrentBoard(index);
  }

  function onMouseExit(index) {
    setCurrentBoard(null);
  }
  return (
    <div className="boardsParent">
      {boards != null &&
        boards.map((board) => (
          <BoardCard
            key={board.id}
            onMouseEnter={onMouseEnter}
            onMouseExit={onMouseExit}
            boardData={board}
            isActive={currentBoard === board.id}
          ></BoardCard>
        ))}
    </div>
  );
}
