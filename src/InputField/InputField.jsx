import "./InputField.css";

export default function InputField({
  children,
  isCorrect,
  error,
  reset,
  ...props
}) {
  return (
    <>
      <div className="inputDiv">
        <span>{children}</span>
        <input
          className={
            isCorrect === true ? "inputField" : "inputField inputFieldError"
          }
          {...props}
        />
        <span className="inputErrorText">{error}</span>
      </div>
    </>
  );
}
