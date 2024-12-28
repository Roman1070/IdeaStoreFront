import { useState } from "react";
import "./InputField.css";

export default function InputField({
  children,
  isCorrect,
  error,
  onChangeAction,
  ...props
}) {
  const [value, setValue] = useState("");
  return (
    <>
      <div className="inputDiv">
        <span>{children}</span>
        <input
          onChange={(event) => {
            setValue(event.target.value);
            if (onChangeAction != null) onChangeAction(event);
          }}
          value={value}
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
