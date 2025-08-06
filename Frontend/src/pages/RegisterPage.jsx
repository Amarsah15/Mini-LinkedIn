import React, { useEffect } from "react";
import RegisterForm from "../components/auth/RegisterForm";

function areCookiesEnabled() {
  document.cookie = "testcookie=1";
  const cookiesEnabled = document.cookie.indexOf("testcookie") !== -1;
  return cookiesEnabled;
}

useEffect(() => {
  if (!areCookiesEnabled()) {
    alert(
      "Cookies are disabled in your browser. Please enable cookies to continue."
    );
    window.location.href = "/help";
  }
}, []);

const RegisterPage = () => <RegisterForm />;

export default RegisterPage;
