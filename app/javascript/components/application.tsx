import React from "react";
import ReactDOM from "react-dom/client"
import { RegistrationForm } from "./registration_form"
import { ChakraProvider } from '@chakra-ui/react'

document.addEventListener("DOMContentLoaded", () => {
  const token = document.querySelector('meta[name="csrf-token"]').content;
  const registrationForm = ReactDOM.createRoot(document.getElementById("registration-form"));
  registrationForm.render(
    <ChakraProvider><RegistrationForm token={token} /></ChakraProvider>
  );
});