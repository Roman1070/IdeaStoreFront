import IdeasScroll from "../IdeasScroll.jsx";
import { GetAllIdeas, GetUsersBoards } from "../requests.js";

import "./Homepage.css";
import { useState } from "react";

export default function Homepage() {
  const [ideas, setIdeas] = useState([]);
  const [boards, setBoards] = useState([]);
  if (ideas.length == 0 && boards.length == 0) {
    GetUsersBoards((json) => {
      setBoards(json);
    });
    GetAllIdeas(false, (ideas) => {
      setIdeas(ideas);
    });
  }

  return (
    <>
      {ideas.length > 0 && boards.length > 0 && (
        <IdeasScroll availableBoards={boards} ideas={ideas}></IdeasScroll>
      )}
    </>
  );
}
