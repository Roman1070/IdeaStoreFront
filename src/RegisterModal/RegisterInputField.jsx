import "./RegisterModal.css";

export default function RegisterInputField({
  children,
  isCorrect,
  error,
  ...props
}) {
  return (
    <>
      <div className="registerInputDiv">
        <span>{children}</span>
        <input
          className={
            isCorrect === true
              ? "registerInput"
              : "registerInput registerInputError"
          }
          {...props}
        />
        <span className="registerErrorText">{error}</span>
      </div>
    </>
  );
}
