import { useOutletContext } from "react-router-dom";
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

export default function Homepage() {
  const [ideas, setIdeas] = useState([]);
  const [boards, setBoards] = useState([]);
  const {
    foundIdeas: [foundIdeas, setFoundIdeas],
    searchInput: [searchInput, setSearchInput],
  } = useOutletContext();

  var loadedIdeasCount = 30;
  if (ideas.length == 0 && boards.length == 0) {
    GetAllIdeas(false, loadedIdeasCount, 0, (ideas) => {
      setIdeas(ideas);
      UpdateIdeasSessionStorage(ideas, loadedIdeasCount);
    });
    GetCurrentUsersBoards((json) => {
      setBoards(json);
    });
  }

  function onScrolledDown(colsCount) {
    let ideasToLoad = colsCount * 6;
    GetAllIdeasThrottled(ideasToLoad, (newIdeas) => {
      if (newIdeas.length > 0) {
        if (!sessionStorage.getItem("ideas")) {
          setIdeas(newIdeas);
          UpdateIdeasSessionStorage(
            newIdeas,
            ideasToLoad + parseInt(sessionStorage.getItem("ideasOffset"))
          );
        } else {
          let currentIdeas = JSON.parse(sessionStorage.getItem("ideas"));
          let currentIds = [];
          for (let i = 0; i < currentIdeas.length; i++) {
            currentIds.push(currentIdeas[i].id);
          }
          if (!currentIds.includes(newIdeas[0].id)) {
            let totalIdeas = currentIdeas.concat(newIdeas);
            setIdeas(totalIdeas);
            UpdateIdeasSessionStorage(
              totalIdeas,
              ideasToLoad + parseInt(sessionStorage.getItem("ideasOffset"))
            );
          }
        }
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
            visibleScrollSize={window.innerHeight - 80}
          ></IdeasScroll>
        )}
      </>
    );
}
