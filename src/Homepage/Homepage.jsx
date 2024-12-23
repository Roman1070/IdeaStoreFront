import IdeasScroll from "../IdeasScroll.jsx";
import GetIdeas, { GetSavedIdeas } from "../db.js";
import "./Homepage.css";
import { useState } from "react";

export default function Homepage() {
  let images = GetIdeas();

  return (
    <>
      <IdeasScroll ideas={images}></IdeasScroll>
    </>
  );
}
