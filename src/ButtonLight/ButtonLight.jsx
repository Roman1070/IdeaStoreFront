import "./ButtonLight.css";
import { Link } from "react-router-dom";
export default function ButtonLight({ children, isSelected, onClick, url }) {
  return (
    <div>
      {url == "" && (
        <button onClick={onClick} className={"buttonLight"}>
          {children}
        </button>
      )}
      {url != "" && (
        <a href={url} onClick={onClick} className={"buttonLight"}>
          {children}
        </a>
      )}
      {isSelected && <div></div>}
    </div>
  );
}
