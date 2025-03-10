import { useState } from "react";
import "./SearchInputField.css";
import { GetLocalImageSrc, cancelDebounce, debounce } from "../utils";
import { SearchIdeas } from "../requests";
export default function SearchInputField({
  onFoundIdeasChanged,
  onSearchInputChanged,
}) {
  const [content, setContent] = useState("");

  const debouncedSearch = debounce((value) => search(value), 1000);
  function search(value) {
    SearchIdeas(value, (ideas) => {
      onSearchInputChanged(value);
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
      onSearchInputChanged("");
      cancelDebounce();
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
