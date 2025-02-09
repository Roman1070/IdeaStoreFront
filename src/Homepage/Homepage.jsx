import IdeasScroll from "../IdeasScroll.jsx";
import { GetAllIdeas, GetCurrentUsersBoards } from "../requests.js";
import {
  GetAllIdeasThrottled,
  Morph,
  ResetThrottledFetchDataTimer,
  ThrottledFetchData,
  UpdateIdeasSessionStorage,
} from "../utils.js";

import "./Homepage.css";
import { useState } from "react";

export default function Homepage({ foundIdeas, searchInput }) {
  const [ideas, setIdeas] = useState([]);
  const [boards, setBoards] = useState([]);

  var loadedIdeasCount = 50;
  if (ideas.length == 0 && boards.length == 0) {
    GetAllIdeas(false, loadedIdeasCount, 0, (ideas) => {
      GetCurrentUsersBoards((json) => {
        setBoards(json);
        setIdeas(ideas);
        UpdateIdeasSessionStorage(ideas, loadedIdeasCount);
      });
    });
  }

  function onScrolledDown(colsCount) {
    let ideasToLoad = colsCount * 10;
    GetAllIdeasThrottled(ideasToLoad, (newIdeas) => {
      if (newIdeas.length > 0) {
        let totalIdeas;
        if (!sessionStorage.getItem("ideas")) {
          totalIdeas = newIdeas;
        } else {
          totalIdeas = JSON.parse(sessionStorage.getItem("ideas")).concat(
            newIdeas
          );
        }
        setIdeas(totalIdeas);
        UpdateIdeasSessionStorage(
          totalIdeas,
          ideasToLoad + parseInt(sessionStorage.getItem("ideasOffset"))
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
