import ButtonLight from "../ButtonLight/ButtonLight";
import SearchInputField from "../SearchInputField/SearchInputField";
import "./MainHeader.css";
export default function MainHeader() {
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
        <ButtonLight>Главная</ButtonLight>
      </span>
      <span
        style={{
          padding: "0 8px",
          flexGrow: "2",
          position: "relative",
        }}
      >
        <ButtonLight>Создать</ButtonLight>
      </span>
      <SearchInputField />
      <button className="mainHeaderSmallButton"></button>
      <button className="mainHeaderSmallButton"></button>
      <button className="mainHeaderSmallButton"></button>
    </header>
  );
}
