import { createPortal } from "react-dom";
import "./CreateBoardModal.css";
import InputField from "../InputField/InputField";
import { useState } from "react";
import { CreateBoard } from "../requests";

export default function CreateBoardModal({ onClose }) {
  function validateName() {
    if (name.length < 3) {
      setNameError("name must be at least 3 characters long");
      return false;
    }
    return true;
  }
  function onClick() {
    if (!validateName()) return;
    CreateBoard(name, (json) => {
      onClose();
    });
  }
  const [nameError, setNameError] = useState("");
  const [name, setName] = useState("");
  function onNameChanged(event) {
    setName(event.target.value);
    setNameError("");
  }
  return createPortal(
    <div className="createBoardModalWrapper">
      <div onClick={onClose} className="createBoardModalBlockFade"></div>
      <div className="createBoardModal">
        <span className="createBoardModalHeader">Создание доски</span>
        <InputField
          onChangeAction={onNameChanged}
          isCorrect={nameError == ""}
          error={nameError}
        >
          Название
        </InputField>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <button onClick={onClick} className="createBoardButton">
            Создать
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
