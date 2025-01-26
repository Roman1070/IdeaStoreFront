import { useState } from "react";
import "./InputField.css";

export default function InputField({
  children,
  isCorrect,
  error,
  onChangeAction,
  defaultValue,
  height,
  maxHeight,
  ...props
}) {
  const [value, setValue] = useState(defaultValue);

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
            height: `${height ? height : ""}`,
            maxHeight: `${maxHeight ? maxHeight : ""}`,
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
