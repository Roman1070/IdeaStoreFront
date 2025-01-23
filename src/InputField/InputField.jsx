import { useState } from "react";
import "./InputField.css";

export default function InputField({
  children,
  isCorrect,
  error,
  onChangeAction,
  defaultValue,
  height,
  ...props
}) {
  const [value, setValue] = useState(defaultValue);
  if (!height) {
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
  } else {
    return (
      <>
        <div className="inputDiv">
          <span>{children}</span>
          <textarea
            maxLength={500}
            onChange={(event) => {
              setValue(event.target.value);
              if (onChangeAction != null) onChangeAction(event);
            }}
            value={value}
            className={
              isCorrect === true ? "inputField" : "inputField inputFieldError"
            }
            style={{
              height: height,
              overflowY: "auto",
              padding: "10px 10px",
            }}
            {...props}
          />
          <span className="inputErrorText">{error}</span>
        </div>
      </>
    );
  }
}
