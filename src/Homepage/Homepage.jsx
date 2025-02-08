import IdeasScroll from "../IdeasScroll.jsx";
import { GetAllIdeas, GetCurrentUsersBoards } from "../requests.js";
import { Morph, ThrottledFetchData } from "../utils.js";

import "./Homepage.css";
import { useState } from "react";

function fetchData(ideasToLoad, onComplete) {
  var ideasOffset = sessionStorage.getItem("ideasOffset");
  ideasToLoad = 35;
  GetAllIdeas(false, ideasToLoad, ideasOffset, (newIdeas) => {
    onComplete(newIdeas);
  });
}

export default function Homepage({ foundIdeas, searchInput }) {
  const [ideas, setIdeas] = useState([]);
  const [boards, setBoards] = useState([]);

  var loadedIdeasCount = 50;
  if (ideas.length == 0 && boards.length == 0) {
    GetAllIdeas(false, loadedIdeasCount, 0, (ideas) => {
      GetCurrentUsersBoards((json) => {
        setBoards(json);
        setIdeas(ideas);
        sessionStorage.setItem("ideasOffset", loadedIdeasCount);
      });
    });
  }

  function onScrolledDown(colsCount) {
    let ideasToLoad = colsCount * 7;
    ThrottledFetchData(fetchData, ideasToLoad, 2000, (newIdeas) => {
      setIdeas(ideas.concat(newIdeas));
      sessionStorage.setItem(
        "ideasOffset",
        sessionStorage.getItem("ideasOffset") + ideasToLoad
      );
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
            loadNewIdeasFunc={(colsCount) => onScrolledDown(colsCount)}
            availableBoards={boards}
            ideas={foundIdeas && searchInput ? foundIdeas : ideas}
          ></IdeasScroll>
        )}
      </>
    );
}
