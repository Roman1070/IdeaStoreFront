import IdeasScroll from "../IdeasScroll.jsx";
import { GetAllIdeas, GetCurrentUsersBoards } from "../requests.js";
import { Morph } from "../utils.js";

import "./Homepage.css";
import { useState } from "react";

export default function Homepage({ foundIdeas, searchInput }) {
  const [ideas, setIdeas] = useState([]);
  const [boards, setBoards] = useState([]);
  const [ideasCount, setIdeasCount] = useState();
  const loadedIdeasCount = 30;
  if (ideas.length == 0 && boards.length == 0) {
    GetAllIdeas(false, loadedIdeasCount, ideasCount, (ideas) => {
      GetCurrentUsersBoards((json) => {
        setBoards(json);
        setIdeas(ideas);
        setIdeasCount(ideasCount + loadedIdeasCount);
      });
    });
  }

  function loadNewIdeas() {
    GetAllIdeas(false, loadedIdeasCount, ideasCount, (ideas) => {
      setIdeasCount(ideasCount + loadedIdeasCount);
      setIdeas(ideas);
    });
  }

  return (
    <>
      {foundIdeas && searchInput && (
        <div className="foundIdeasHeader">{`По запросу "${searchInput}" найдено ${
          foundIdeas.length
        } ${Morph(foundIdeas.length)}`}</div>
      )}
      {ideas.length > 0 && (
        <IdeasScroll
          loadNewIdeasFunc={loadNewIdeas}
          availableBoards={boards}
          ideas={foundIdeas && searchInput ? foundIdeas : ideas}
        ></IdeasScroll>
      )}
    </>
  );
}
