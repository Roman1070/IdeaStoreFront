import { useState } from "react";
import "./SearchInputField.css";
import { GetLocalImageSrc, debounce } from "../utils";
import { SearchIdeas } from "../requests";
export default function SearchInputField({ onFoundIdeasChanged }) {
  const [content, setContent] = useState("");

  const debouncedSearch = debounce((value) => search(value), 700);
  function search(value) {
    SearchIdeas(value, (ideas) => {
      var result = [];
      if (ideas) {
        for (var i = 0; i < ideas.length; i++) {
          if (!ideas[i].saved) {
            result.push(ideas[i]);
          }
        }
      }
      onFoundIdeasChanged(result);
    });
  }
  function onSearchChanged(value) {
    setContent(value);
    if (value) {
      debouncedSearch(value);
    } else {
      onFoundIdeasChanged([]);
    }
  }

  return (
    <div className="searchInputFieldBlock">
      <img
        src={GetLocalImageSrc("lupa.png")}
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
        onChange={(event) => onSearchChanged(event.target.value)}
        value={content}
      ></input>
    </div>
  );
}
