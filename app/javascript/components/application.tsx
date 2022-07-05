import React from "react";
import ReactDOM from "react-dom/client"
import { LoginForm } from "./login_form"
import { ChakraProvider } from '@chakra-ui/react'


const App = (props) => {
  return (
    <>
      <LoginForm {...props} />
    </>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const token = document.querySelector('meta[name="csrf-token"]').content;
  const loginForm = ReactDOM.createRoot(document.getElementById("login-form"));
  loginForm.render(
    <ChakraProvider><App token={token} /></ChakraProvider>
  );
});
