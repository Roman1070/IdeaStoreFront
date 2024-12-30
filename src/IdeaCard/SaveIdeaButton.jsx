import { useState } from "react";
import { ToggleSaveIdea } from "../requests";
import "./IdeaCard.css";

export default function SaveIdeaButton({ idea, onSaved, saved }) {
  const [isSaved, setIsSaved] = useState(saved);
  function toggleSave() {
    ToggleSaveIdea(idea.id, 1, (json) => {
      if (Object.hasOwn(json, "err")) {
        alert("internal error: " + json.err);
      } else {
        setIsSaved(json.now_saved);
        if (onSaved) onSaved(json.now_saved);
      }
    });
  }

  return (
    <div className="saveButtonHolder">
      <button
        onClick={toggleSave}
        className={isSaved ? "saveButton reversed" : "saveButton active"}
      >
        {isSaved ? "Сохранено" : "Сохранить"}
      </button>
    </div>
  );
}
