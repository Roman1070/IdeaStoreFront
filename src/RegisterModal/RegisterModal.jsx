import { useRef } from "react";
import "./RegisterModal.css";
import { createPortal } from "react-dom";
import RegisterForm from "./RegisterForm";

export default function RegisterModal({ open, closeFunc }) {
  return createPortal(
    <>
      <div onClick={closeFunc} className="registerModalBlockFade"></div>
      <div className="registerModalBlock">
        <div className="registerModalContainer">
          <div className="registerModalIconContainer">
            <img src="logo.png" alt="" className="registerModalIcon" />
          </div>
          <h2 className="registerWelcomeText">
            Добро пожаловать в <br />
            IdeaStore
          </h2>
          <h5 className="registerWelcomeSubtext">
            Находите новые идеи для <br />
            вдохновения
          </h5>
          <RegisterForm />
        </div>
      </div>
    </>,
    document.getElementById("registerModal")
  );
}
