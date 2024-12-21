import ButtonLight from "../ButtonLight/ButtonLight";
import SearchInputField from "../SearchInputField/SearchInputField";
import "./MainHeader.css";
import { useState } from "react";
export default function MainHeader() {
  const [selectedTab, setSelectedTab] = useState(0);
  console.log(selectedTab);
  return (
    <header className="mainHeader">
      <img
        src="logo.png"
        alt=""
        style={{
          height: "32px",
          display: "flex",
          transformOrigin: "50% 100%",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      />
      <span
        style={{
          padding: "0 8px",
          flexGrow: "2",
          position: "relative",
        }}
      >
        <ButtonLight
          onClick={() => {
            setSelectedTab(0);
          }}
          isSelected={selectedTab == 0}
        >
          Главная
        </ButtonLight>
      </span>
      <span
        style={{
          padding: "0 8px",
          flexGrow: "2",
          position: "relative",
        }}
      >
        <ButtonLight
          isSelected={selectedTab == 1}
          onClick={() => {
            setSelectedTab(1);
          }}
        >
          Создать
        </ButtonLight>
      </span>
      <SearchInputField />

      <button className="mainHeaderSmallButton">
        <img src="bell.png" alt="" className="imgInHeaderSmallButton" />
      </button>
      <button className="mainHeaderSmallButton">
        <img src="message.png" alt="" className="imgInHeaderSmallButton" />
      </button>
      <button
        onClick={() => {
          setSelectedTab(2);
        }}
        className="mainHeaderSmallButton"
      >
        <img src="profileTemp.jpg" alt="" className="imgInHeaderSmallButton" />
      </button>
    </header>
  );
}
