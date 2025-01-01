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
        <a
          href={url}
          onClick={onClick}
          className={isSelected ? "buttonLightActive" : "buttonLight"}
        >
          {children}
        </a>
      )}
      {isSelected && <div></div>}
    </div>
  );
}
