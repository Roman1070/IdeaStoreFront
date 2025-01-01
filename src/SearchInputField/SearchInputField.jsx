import { useState } from "react";
import "./SearchInputField.css";
export default function SearchInputField() {
  const [content, setContent] = useState("");
  return (
    <div className="searchInputFieldBlock">
      <img
        src="http://localhost:3000/images/lupa.png"
        style={{
          height: "24px",
          width: "24px",
          left: "12px",
          top: "10px",
        }}
      ></img>
      <input
        name="searchInputField"
        className="searchInputField"
        onChange={(event) => setContent(event.target.value)}
        value={content}
      ></input>
    </div>
  );
}
