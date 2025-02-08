import IdeasScroll from "../IdeasScroll.jsx";
import { GetAllIdeas, GetCurrentUsersBoards } from "../requests.js";
import { Morph, ThrottledFetchData } from "../utils.js";

import "./Homepage.css";
import { useState } from "react";

export function FetchData(ideasToLoad, onComplete) {
  var ideasOffset = sessionStorage.getItem("ideasOffset");
  GetAllIdeas(false, ideasToLoad, ideasOffset, (newIdeas) => {
    onComplete(newIdeas);
  });
}

export default function Homepage({ foundIdeas, searchInput }) {
  const [ideas, setIdeas] = useState([]);
  const [boards, setBoards] = useState([]);
  const throttleDelay = 2000;

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
    ThrottledFetchData(FetchData, ideasToLoad, throttleDelay, (newIdeas) => {
      console.log(newIdeas);
      if (newIdeas.length > 0) {
        setIdeas(ideas.concat(newIdeas));
        sessionStorage.setItem(
          "ideasOffset",
          parseInt(sessionStorage.getItem("ideasOffset")) + ideasToLoad
        );
      }
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
