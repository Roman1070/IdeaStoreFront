import "./ButtonLight.css";

export default function ButtonLight({ children, isSelected }) {
  return (
    <button
      className={"buttonLight" + (isSelected ? " buttonLightActive" : "")}
    >
      {children}
    </button>
  );
}
