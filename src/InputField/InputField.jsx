import { useState } from "react";
import "./InputField.css";

export default function InputField({
  children,
  isCorrect,
  error,
  onChangeAction,
  height,
  value,
  isCommonInput,
  ...props
}) {
  if (isCommonInput) {
    return (
      <>
        <div className="inputDiv">
          <span>{children}</span>
          <input
            maxLength={500}
            onChange={(event) => {
              onChangeAction(event.target.value);
            }}
            value={value}
            className={
              isCorrect === true ? "inputField" : "inputField inputFieldError"
            }
            style={{
              height: `${height ? height : ""}`,
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
  return (
    <>
      <div className="inputDiv">
        <span>{children}</span>
        <textarea
          maxLength={500}
          onChange={(event) => {
            onChangeAction(event.target.value);
          }}
          value={value}
          className={
            isCorrect === true ? "inputField" : "inputField inputFieldError"
          }
          style={{
            height: `${height ? height : ""}`,
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
