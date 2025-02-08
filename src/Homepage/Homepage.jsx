import IdeasScroll from "../IdeasScroll.jsx";
import { GetAllIdeas, GetCurrentUsersBoards } from "../requests.js";
import { Morph } from "../utils.js";

import "./Homepage.css";
import { useState } from "react";

export default function Homepage({ foundIdeas, searchInput }) {
  const requestInterval = 5000;
  const [ideas, setIdeas] = useState();
  const [boards, setBoards] = useState();
  const [ideasCount, setIdeasCount] = useState(0);
  var loadedIdeasCount = 50;
  const [requestLocked, setRequestLocked] = useState(false);
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
    if (requestLocked) return;
    loadedIdeasCount = columnsCount * 6;
    GetAllIdeas(false, loadedIdeasCount, ideasCount, (ideas) => {
      setIdeasCount(ideasCount + ideas.length);
      setIdeas(ideas);
      setRequestLocked(true);
      setTimeout(() => setRequestLocked(false), requestInterval);
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
