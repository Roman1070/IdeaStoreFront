import "./LoginModal.css";
import RegisterInputField from "../RegisterModal/RegisterInputField";
import { useState } from "react";
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
export default function LoginForm() {
  const [emailError, setEmailError] = useState("");

  function handleLogin(json) {
    if (Object.hasOwn(json, "err")) {
      console.log(json.err);
      setEmailError(json.err);
    } else if (Object.hasOwn(json, "token")) {
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("authToken", json.token);
      window.location.assign("/");
    }
  }
  var handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.password.value;

    if (!validateEmail(email)) {
      setEmailError("Wrong email format");
      return;
    }
    fetch(`http://localhost:8181/login?email=${email}&password=${password}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => handleLogin(json));
  };
  return (
    <form className="registerForm" onSubmit={handleSubmit}>
      <RegisterInputField
        name="email"
        type="email"
        onChange={() => setEmailError("")}
        isCorrect={emailError == ""}
        error={emailError}
        placeholder={"Введите адрес эл.почты"}
      >
        Адрес электронной почты
      </RegisterInputField>
      <RegisterInputField
        name="password"
        type="password"
        isCorrect={true}
        placeholder={"Создайте пароль"}
      >
        Пароль
      </RegisterInputField>
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
