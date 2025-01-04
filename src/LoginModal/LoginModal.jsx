import { createPortal } from "react-dom";
import "../RegisterModal/RegisterModal.css";
import LoginForm from "./LoginForm";

export default function LoginModal({ closeFunc }) {
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
          <LoginForm />
        </div>
      </div>
    </>,
    document.getElementById("modal")
  );
}
