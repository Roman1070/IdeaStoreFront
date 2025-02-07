import { Link } from "react-router-dom";
import "./ButtonLight.css";

export default function ButtonLight({ children, isSelected, onClick, url }) {
  return (
    <div>
      {url == "" && (
        <button
          onClick={onClick}
          className={isSelected ? "buttonLightActive" : "buttonLight"}
        >
          {children}
        </button>
      )}
      {url != "" && (
        <Link
          to={url}
          onClick={onClick}
          className={isSelected ? "buttonLightActive" : "buttonLight"}
        >
          {children}
        </Link>
      )}
      {isSelected && <div></div>}
    </div>
  );
}
