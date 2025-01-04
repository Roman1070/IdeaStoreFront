import { useState } from "react";
import BoardCard from "../BoardCard/BoardCards";
import "./BoardsScroll.css";
import CreateBoardPopup from "../CreateBoardPopup/CreateBoardPopup";

export default function BoardsScroll({ boards, enableCreateButton }) {
  const [currentBoard, setCurrentBoard] = useState(null);
  const [displayPopup, setDisplayPopup] = useState(false);
  function onMouseEnter(index) {
    setCurrentBoard(index);
  }

  function onMouseExit(index) {
    setCurrentBoard(null);
  }
  return (
    <div className="boardsParent">
      {displayPopup && (
        <CreateBoardPopup
          onClose={() => setDisplayPopup(false)}
        ></CreateBoardPopup>
      )}
      {boards != null &&
        boards.map((board) => (
          <BoardCard
            key={board.id}
            onMouseEnter={onMouseEnter}
            onMouseExit={onMouseExit}
            boardData={board}
            isActive={currentBoard === board.id}
            isCreateCard={false}
          ></BoardCard>
        ))}
      {enableCreateButton && (
        <BoardCard
          onMouseEnter={onMouseEnter}
          onMouseExit={onMouseExit}
          isActive={currentBoard == 0}
          isCreateCard={true}
          onClick={() => setDisplayPopup(true)}
        ></BoardCard>
      )}
    </div>
  );
}
