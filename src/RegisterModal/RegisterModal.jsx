import { useRef } from "react";
import "./RegisterModal.css";
import { createPortal } from "react-dom";
import RegisterInputField from "./RegisterInputField";

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
          <form className="registerForm">
            <RegisterInputField
              name="email"
              type="email"
              placeholder={"Введите адрес эл.почты"}
            >
              Адрес электронной почты
            </RegisterInputField>
            <RegisterInputField
              name="password"
              type="password"
              placeholder={"Создайте пароль"}
            >
              Пароль
            </RegisterInputField>
            <RegisterInputField
              name="password_confirm"
              type="password"
              placeholder={"Введите пароль еще раз"}
            >
              Подтверждение пароля
            </RegisterInputField>
            <RegisterInputField
              name="birth_date"
              type="date"
              placeholder={"дд.мм.гггг"}
            >
              Дата рождения
            </RegisterInputField>
            <div className="registerInputDiv">
              <input
                type="submit"
                className="registerSubmitButton"
                value="Продолжить"
              />
            </div>
          </form>
        </div>
      </div>
    </>,
    document.getElementById("registerModal")
  );
}
