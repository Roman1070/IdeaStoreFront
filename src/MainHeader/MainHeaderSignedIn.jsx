import ButtonLight from "../ButtonLight/ButtonLight";
import ProfileModal from "../ProfileModal/ProfileModal";
import SearchInputField from "../SearchInputField/SearchInputField";
import "./MainHeader.css";
import { useState } from "react";

export default function MainHeaderSignedIn() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [modalEnabled, setModelEnabled] = useState(false);
  return (
    <>
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
            url={"/"}
            onClick={() => {
              setSelectedTab(0);
            }}
            isSelected={window.location.pathname === "/"}
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
            url={"/create"}
            isSelected={window.location.pathname === "/create"}
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
        <a href="/saved_ideas" className="mainHeaderSmallButton">
          <img
            src="profileTemp.jpg"
            alt=""
            className="imgInHeaderSmallButton"
          />
        </a>
        <button
          className="arrowNearProfile"
          onClick={() => setModelEnabled(!modalEnabled)}
        >
          <img src="downArrow.png" alt="" className="imgInHeaderSmallButton" />
        </button>
      </header>
      <div className="mainHeaderHeightBlock"></div>
      {modalEnabled && <ProfileModal />}
    </>
  );
}
