import React from "react";
import ReactDOM from "react-dom/client"
import { RegistrationForm } from "./registration_form"
import { ChakraProvider } from '@chakra-ui/react'


const App = (props) => {
  return (
    <>
      <RegistrationForm {...props} />
    </>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const token = document.querySelector('meta[name="csrf-token"]').content;
  const registrationForm = ReactDOM.createRoot(document.getElementById("login-form"));
  registrationForm.render(
    <ChakraProvider><App token={token} /></ChakraProvider>
  );
});