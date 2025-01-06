import IdeasScroll from "../IdeasScroll.jsx";
import { GetAllIdeas, GetCurrentUsersBoards } from "../requests.js";

import "./Homepage.css";
import { useState } from "react";

export default function Homepage() {
  const [ideas, setIdeas] = useState([]);
  const [boards, setBoards] = useState([]);
  if (ideas.length == 0 && boards.length == 0) {
    GetAllIdeas(false, (ideas) => {
      GetCurrentUsersBoards((json) => {
        setBoards(json);
      });
      setIdeas(ideas);
    });
  }

  return (
    <>
      {ideas.length > 0 && (
        <IdeasScroll availableBoards={boards} ideas={ideas}></IdeasScroll>
      )}
    </>
  );
}
