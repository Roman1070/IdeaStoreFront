import IdeasScroll from "../IdeasScroll.jsx";
import { GetAllIdeas, GetCurrentUsersBoards } from "../requests.js";
import {
  Morph,
  ResetThrottledFetchDataTimer,
  ThrottledFetchData,
} from "../utils.js";

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
  const throttleDelay = 20000;

  var loadedIdeasCount = 50;
  if (ideas.length == 0 && boards.length == 0) {
    GetAllIdeas(false, loadedIdeasCount, 0, (ideas) => {
      GetCurrentUsersBoards((json) => {
        setBoards(json);
        setIdeas(ideas);
        sessionStorage.setItem("ideas", JSON.stringify(ideas));
        sessionStorage.setItem("ideasOffset", loadedIdeasCount);
      });
    });
  }

  function onScrolledDown(colsCount) {
    let ideasToLoad = colsCount * 10;
    ThrottledFetchData(FetchData, ideasToLoad, throttleDelay, (newIdeas) => {
      if (newIdeas.length > 0) {
        var totalIdeas = JSON.parse(sessionStorage.getItem("ideas")).concat(
          newIdeas
        );
        setIdeas(totalIdeas);
        sessionStorage.setItem("ideas", JSON.stringify(totalIdeas));
        sessionStorage.setItem(
          "ideasOffset",
          parseInt(sessionStorage.getItem("ideasOffset")) + ideasToLoad
        );
        ResetThrottledFetchDataTimer();
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
