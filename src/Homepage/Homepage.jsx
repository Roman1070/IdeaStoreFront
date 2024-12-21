import PinsScroll from "../IdeasScroll.jsx";
import "./Homepage.css";
import { useState } from "react";

export default function Homepage() {
  let images = [];
  let savedImages = [];
  for (let i = 0; i < 40; i++) {
    images.push({
      src: `images/image${i + 1}.jpg`,
      index: i,
    });
    if (i % 2 == 0) {
      savedImages.push({
        src: `images/image${i + 1}.jpg`,
        index: i,
      });
    }
  }

  return (
    <>
      <PinsScroll images={images}></PinsScroll>
    </>
  );
}
