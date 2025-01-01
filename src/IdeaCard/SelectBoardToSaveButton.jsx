import { useState } from "react";
import "./IdeaCard.css";

export default function SelectBoardToSaveButton({
  availableBoards,
  startBoardId,
  setSelectedBoard,
  saved,
}) {
  var boards = [
    {
      id: -1,
      name: "Профиль",
    },
  ];
  var content = [];
  if (availableBoards) {
    boards = Array.from(availableBoards);
    boards.splice(0, 0, {
      id: -1,
      name: "Профиль",
    });
    for (var i = 0; i < boards.length; i++) {
      content.push(
        <option
          name={boards[i].name}
          className="selectBoardButtonOption"
          key={i}
        >
          {boards[i].name}
        </option>
      );
    }
  }

  const [selectedBoardName, setSelectedBoardName] = useState(
    boards != null ? getBoardName(startBoardId) : "Профиль"
  );

  function getBoardId(name) {
    for (var i = 0; i < boards.length; i++) {
      if (boards[i].name == name) return boards[i].id;
    }
  }

  function getBoardName(id) {
    for (var i = 0; i < boards.length; i++) {
      if (boards[i].id == id) return boards[i].name;
    }
  }
  function onChange(event) {
    setSelectedBoardName(event.target.value);
    setSelectedBoard(getBoardId(event.target.value));
  }
  if (!saved) {
    return (
      <select
        name="selectBoardToSave"
        defaultValue={getBoardName(startBoardId)}
        onChange={onChange}
        className="selectBoardButton"
      >
        {content}
      </select>
    );
  } else
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          fontFamily: "inherit",
        }}
      >
        <a href="/saved_ideas" className="selectBoardLink">
          {selectedBoardName}
        </a>
      </div>
    );
}
