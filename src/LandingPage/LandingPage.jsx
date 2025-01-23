import { useSearchParams } from "react-router-dom";
import GetIdeas from "../db";
import IdeasScroll from "../IdeasScroll";
import "./LandingPage.css";
import { useState } from "react";
import { GetAllIdeas } from "../requests";
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
export default function LandingPage() {
  const [ideas, setIdeas] = useState([]);
  const [ideasEmpty, setIdeasEmpty] = useState(true);
  if (ideasEmpty) {
    GetAllIdeas(true, (ideas) => {
      setIdeas(ideas);
      setIdeasEmpty(false);
    });
  }
  return (
    <div className="landingScroll">
      <IdeasScroll ideas={ideas}></IdeasScroll>
    </div>
  );
}
