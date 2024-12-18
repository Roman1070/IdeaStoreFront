import ButtonLight from "./ButtonLight";
import "./MainHeader.css";
export default function MainHeader() {
  return (
    <header className="mainHeader">
      <img
        src="logo.png"
        alt=""
        style={{
          height: "32px",
          display: "inline-block",
          transformOrigin: "50% 100%",
          marginLeft: "20px",
        }}
      />
      <span
        style={{
          padding: "0 16px",
        }}
      >
        <ButtonLight>Главная</ButtonLight>
      </span>
      <span
        style={{
          padding: "0 16px",
        }}
      >
        <ButtonLight>Создать</ButtonLight>
      </span>
    </header>
  );
}
