import { useState } from "react";
import "./IdeaCard.css";
import { GetLocalImageSrc } from "../utils";

export default function SelectBoardToSaveButton({
  availableBoards,
  startBoardId,
  startBoardName,
  setSelectedBoard,
  saved,
  reverseColors,
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

  const [selectedBoardName, setSelectedBoardName] = useState(startBoardName);
  const [selectedBoardId, setSelectedBoardId] = useState(startBoardId);
  const name = getBoardName(selectedBoardId);
  if (!selectedBoardName && name) {
    setSelectedBoardName(name);
  }
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
    setSelectedBoardId(getBoardId(event.target.value));
    setSelectedBoard(getBoardId(event.target.value));
  }
  const color = reverseColors === true ? "white" : "black";
  console.log(boards);
  if (!saved) {
    return (
      <div className="selectBoardButtonBlock">
        <select
          name="selectBoardToSave"
          defaultValue={getBoardName(startBoardId)}
          onChange={onChange}
          className="selectBoardButton"
          style={{
            color: color,
          }}
        >
          {content}
        </select>
        <img
          src={GetLocalImageSrc(
            reverseColors === true ? "downArrow.png" : "downArrowBlack.png"
          )}
          style={{
            height: "20px",
            width: "20px",
            display: "inline-block",
            margin: "15px 3px 15px 3px",
            position: "absolute",
            right: "0px",
          }}
        ></img>
      </div>
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
        <a
          href={!selectedBoardId ? "/saved_ideas" : `/board/${selectedBoardId}`}
          className="selectBoardLink"
          style={{
            marginLeft: "20px",
            color: "black",
          }}
        >
          {selectedBoardName ? selectedBoardName : startBoardName}
        </a>
      </div>
    );
}
