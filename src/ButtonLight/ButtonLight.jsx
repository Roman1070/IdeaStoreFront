import "./ButtonLight.css";
import { Link } from "react-router-dom";
export default function ButtonLight({ children, isSelected, onClick, url }) {
  return (
    <div
      style={{
        display: "inline-block",
      }}
    >
      <button onClick={onClick} className={"buttonLight"}>
        {children}
      </button>
      {isSelected && (
        <div
          style={{
            height: "2px",
            backgroundColor: "#000",
          }}
        ></div>
      )}
    </div>
  );
}
