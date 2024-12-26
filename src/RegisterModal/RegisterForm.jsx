import "./RegisterModal.css";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import InputField from "../InputField/InputField";
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
function validatePassword(pass, confirm) {
  if (pass != confirm)
    return {
      field: "confirm",
      msg: "Passwords must match",
    };
  if (pass.length < 6)
    return {
      field: "password",
      msg: "Passwords length must be at least 6 characters long",
    };
  return {
    field: "password",
    msg: "ok",
  };
}

export default function RegisterForm() {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  function handleRegister(json) {
    if (Object.hasOwn(json, "err")) {
      console.log(json.err);
      setEmailError(json.err);
    } else if (Object.hasOwn(json, "user_id")) {
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("user_id", json.user_id);
      window.location.assign("/");
    }
  }
  var handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.passwordConfirm.value;
    const birthDate = event.target.birthDate.value;
    if (!validateEmail(email)) {
      setEmailError("Wrong email format");
      return;
    }
    const validatePasswordResult = validatePassword(password, confirmPassword);
    if (validatePasswordResult.msg != "ok") {
      if (validatePasswordResult.field == "confirm") {
        setConfirmPasswordError(validatePasswordResult.msg);
      }
      if (validatePasswordResult.field == "password") {
        setPasswordError(validatePasswordResult.msg);
      }
      return;
    }
    const req = JSON.stringify({
      email: email,
      password: password,
    });
    fetch(`http://localhost:8181/register`, {
      method: "POST",
      headers: {
        /** Заголовок, указывающий, что клиент ожидает получить данные в формате JSON */
        Accept: "application/json",

        /** Заголовок, указывающий, что тело запроса отправляется в формате JSON */
        "Content-Type": "application/json",
      },
      body: req,
    })
      .then((response) => response.json())
      .then((json) => handleRegister(json));
  };
  return (
    <form className="registerForm" onSubmit={handleSubmit}>
      <InputField
        name="email"
        type="email"
        onChange={() => setEmailError("")}
        isCorrect={emailError == ""}
        error={emailError}
        placeholder={"Введите адрес эл.почты"}
      >
        Адрес электронной почты
      </InputField>
      <InputField
        name="password"
        type="password"
        isCorrect={passwordError == ""}
        error={passwordError}
        onChange={() => setPasswordError("")}
        placeholder={"Создайте пароль"}
      >
        Пароль
      </InputField>
      <InputField
        name="passwordConfirm"
        type="password"
        isCorrect={confirmPasswordError == ""}
        error={confirmPasswordError}
        onChange={() => setConfirmPasswordError("")}
        placeholder={"Введите пароль еще раз"}
      >
        Подтверждение пароля
      </InputField>
      <InputField
        name="birthDate"
        type="date"
        isCorrect={birthDateError == ""}
        error={birthDateError}
        placeholder={"дд.мм.гггг"}
      >
        Дата рождения
      </InputField>
      <div className="registerInputDiv">
        <input
          type="submit"
          className="registerSubmitButton"
          value="Продолжить"
        />
      </div>
    </form>
  );
}
