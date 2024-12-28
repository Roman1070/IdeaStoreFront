import { useSearchParams } from "react-router-dom";
import GetIdeas from "../db";
import IdeasScroll from "../IdeasScroll";
import { GetAllIdeas } from "../utils";
import "./LandingPage.css";
import { useState } from "react";
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
export default function LandingPage() {
  const [ideas, setIdeas] = useState([]);
  const [ideasEmpty, setIdeasEmpty] = useState(true);
  if (ideasEmpty) {
    GetAllIdeas((ideas) => {
      setIdeas(ideas);
      setIdeasEmpty(false);
    });
  }
  return (
    <>
      <IdeasScroll ideas={ideas}></IdeasScroll>
    </>
  );
}
