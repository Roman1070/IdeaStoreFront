import { useState } from "react";
import BoardCard from "../BoardCard/BoardCards";
import "./BoardsScroll.css";
import CreateBoardModal from "../CreateBoardModal/CreateBoardModal";

export default function BoardsScroll({
  boards,
  enableCreateButton,
  onBoardCreated,
  onBoardRemoved,
  enableDelete,
  visibleScrollSize,
}) {
  const [currentBoard, setCurrentBoard] = useState(null);
  const [displayPopup, setDisplayPopup] = useState(false);
  function onMouseEnter(index) {
    setCurrentBoard(index);
  }

  function onMouseExit(index) {
    setCurrentBoard(null);
  }
  return (
    <div
      className="boardsParent"
      id="boardsParent"
      style={{
        height: `${visibleScrollSize}px`,
      }}
    >
      {displayPopup && (
        <CreateBoardModal
          onClose={() => {
            setDisplayPopup(false);
            onBoardCreated();
          }}
        ></CreateBoardModal>
      )}
      {boards != null &&
        boards.map((board) => (
          <BoardCard
            enableDelete={enableDelete}
            refreshFunc={onBoardRemoved}
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
