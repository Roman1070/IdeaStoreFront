import { useState } from "react";
import { ToggleSaveIdea } from "../requests";
import "./IdeaCard.css";

export default function SaveIdeaButton({ index, onSaved, saved, board }) {
  function toggleSave() {
    ToggleSaveIdea(index, board, (json) => {
      if (Object.hasOwn(json, "err")) {
        alert("internal error: " + json.err);
      } else {
        onSaved(json.nowSaved);
      }
    });
  }

  return (
    <button
      onClick={toggleSave}
      className={saved ? "saveButton reversed" : "saveButton active"}
    >
      {saved ? "Сохранено" : "Сохранить"}
    </button>
  );
}
