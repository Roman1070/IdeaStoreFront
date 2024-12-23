import ButtonLight from "../ButtonLight/ButtonLight";
import RegisterModal from "../RegisterModal/RegisterModal";
import SearchInputField from "../SearchInputField/SearchInputField";
import "./MainHeader.css";
import { useState } from "react";

export default function MainHeaderGuest() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [displayRegisterModal, setDisplayRegisterModal] = useState(false);
  console.log(displayRegisterModal);
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
            marginRight: "10px",
          }}
        />
        <div className="appName">IdeaStore</div>
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
            isSelected={window.location.pathname == "/"}
          >
            Просмотреть
          </ButtonLight>
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <button className="signInButton">Войти</button>
          <button
            onClick={() => {
              setDisplayRegisterModal(true);
              document.body.style.overflow = "hidden";
            }}
            className="signUpButton"
          >
            Регистрация
          </button>
        </div>
      </header>
      <div className="mainHeaderHeightBlock"></div>
      {displayRegisterModal && <RegisterModal />}
    </>
  );
}
