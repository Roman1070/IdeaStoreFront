import "./LoginModal.css";
import InputField from "../InputField/InputField";
import { useEffect, useState } from "react";
import { JoinClientAddress } from "../utils";
import { Login } from "../requests";
import { Navigate, useNavigate } from "react-router-dom";
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
export default function LoginForm() {
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [shouldRedirect, setShouldRedirect] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (shouldRedirect) {
      navigate("/");
    }
  });
  function handleLogin(json) {
    if (Object.hasOwn(json, "err")) {
      console.log(json.err);
      setEmailError(json.err);
    } else if (Object.hasOwn(json, "token")) {
      let date = new Date(Date.now() + 86400e3);
      date = date.toUTCString();
      document.cookie = `token=${json.token}; path=/; expires=${date}`;
      setShouldRedirect(true);
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
    Login(email, password, handleLogin);
  };
  return (
    <form className="registerForm" onSubmit={handleSubmit}>
      <InputField
        isCommonInput={true}
        name="email"
        type="email"
        value={email}
        onChangeAction={(val) => {
          setEmailError("");
          setEmail(val);
        }}
        isCorrect={emailError == ""}
        error={emailError}
        placeholder={"Введите адрес эл.почты"}
        height={"20px"}
      >
        Адрес электронной почты
      </InputField>
      <InputField
        isCommonInput={true}
        name="password"
        type="password"
        value={password}
        onChangeAction={(val) => {
          setPassword(val);
        }}
        isCorrect={true}
        placeholder={"Введите пароль"}
        height={"20px"}
      >
        Пароль
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
