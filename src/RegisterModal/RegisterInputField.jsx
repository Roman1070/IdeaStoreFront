import "./RegisterModal.css";

export default function RegisterInputField({ children, ...props }) {
  return (
    <>
      <div className="registerInputDiv">
        <span>{children}</span>
        <input className="registerInput" {...props} />
      </div>
    </>
  );
}
