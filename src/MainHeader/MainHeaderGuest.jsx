import ButtonLight from "../ButtonLight/ButtonLight";
import LoginForm from "../LoginModal/LoginForm";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SearchInputField from "../SearchInputField/SearchInputField";
import { GetLocalImageSrc } from "../utils";
import "./MainHeader.css";
import { useState } from "react";

export default function MainHeaderGuest() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [displayRegisterModal, setDisplayRegisterModal] = useState(false);
  const [displayLoginModal, setDisplayLoginModal] = useState(false);
  if (displayRegisterModal || displayLoginModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }
  return (
    <>
      <header className="mainHeader">
        <div className="mainHeaderLeftBlock">
          <img
            src={GetLocalImageSrc("logo.png")}
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
          {window.innerWidth > 600 && (
            <span
              style={{
                padding: "0 8px",
                flex: "1",
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
          )}
        </div>
        <div className="mainHeaderRightBlock">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flex: "1",
              justifyContent: "end",
            }}
          >
            <button
              className="signInButton"
              onClick={() => {
                setDisplayLoginModal(true);
              }}
            >
              Войти
            </button>
            <button
              onClick={() => {
                setDisplayRegisterModal(true);
              }}
              className="signUpButton"
            >
              Регистрация
            </button>
          </div>
        </div>
      </header>
      <div className="mainHeaderHeightBlock"></div>
      {displayRegisterModal && (
        <RegisterModal closeFunc={() => setDisplayRegisterModal(false)} />
      )}
      {displayLoginModal && (
        <LoginModal closeFunc={() => setDisplayLoginModal(false)} />
      )}
    </>
  );
}
