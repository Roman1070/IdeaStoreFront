import ButtonLight from "../ButtonLight/ButtonLight";
import ProfileModal from "../ProfileModal/ProfileModal";
import SearchInputField from "../SearchInputField/SearchInputField";
import SmallRoundButton from "../SmallRoundButton/SmallRoundButton";
import "./MainHeader.css";
import "../SmallRoundButton/SmallRoundButton.css";
import { useState } from "react";
const HostName = "http://localhost:3000/";
export default function MainHeaderSignedIn() {
  const [modalEnabled, setModelEnabled] = useState(false);
  const smallButtonSize = 40;
  const smallButtonMargin = 8;
  return (
    <>
      <header className="mainHeader">
        <img
          src={HostName + "images/logo.png"}
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
          <ButtonLight url={"/"} isSelected={window.location.pathname === "/"}>
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
          >
            Создать
          </ButtonLight>
        </span>
        <SearchInputField />

        <SmallRoundButton
          size={smallButtonSize}
          imgSrc={HostName + "images/bell.png"}
          marginRight={smallButtonMargin}
        ></SmallRoundButton>

        <SmallRoundButton
          size={smallButtonSize}
          imgSrc={HostName + "images/message.png"}
          marginRight={smallButtonMargin}
        ></SmallRoundButton>

        <SmallRoundButton
          size={smallButtonSize}
          isLink={true}
          href="/saved_ideas"
          imgSrc={HostName + "images/profileTemp.jpg"}
        ></SmallRoundButton>
        <button
          className="arrowNearProfile"
          onClick={() => setModelEnabled(!modalEnabled)}
        >
          <img
            src={HostName + "images/downArrow.png"}
            alt=""
            className="imgInSmallRoundButton"
          />
        </button>
      </header>
      <div className="mainHeaderHeightBlock"></div>
      {modalEnabled && <ProfileModal />}
    </>
  );
}
