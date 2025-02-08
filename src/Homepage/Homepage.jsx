import IdeasScroll from "../IdeasScroll.jsx";
import { GetAllIdeas, GetCurrentUsersBoards } from "../requests.js";
import { Morph } from "../utils.js";

import "./Homepage.css";
import { useState } from "react";

export default function Homepage({ foundIdeas, searchInput }) {
  const [ideas, setIdeas] = useState();
  const [boards, setBoards] = useState();
  const [ideasCount, setIdeasCount] = useState(0);
  var loadedIdeasCount = 50;
  if (!ideas && !boards) {
    setIdeas([]);
    setBoards([]);
    GetAllIdeas(false, loadedIdeasCount, ideasCount, (ideas) => {
      GetCurrentUsersBoards((json) => {
        setBoards(json);
        setIdeas(ideas);
        setIdeasCount(ideasCount + loadedIdeasCount);
      });
    });
  }

  function loadNewIdeas(columnsCount) {
    loadedIdeasCount = columnsCount * 6;
    GetAllIdeas(false, loadedIdeasCount, ideasCount, (ideas) => {
      setIdeasCount(ideasCount + loadedIdeasCount);
      setIdeas(ideas);
    });
  }
  if (ideas && boards)
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
