import { Turbo } from "@hotwired/turbo-rails";
import React, { Component } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Box,
  Button,
  InputLeftElement,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
import { motion } from "framer-motion";

export type LoginFormProps = { token?: string };

export class LoginForm extends Component<LoginFormProps> {
  readonly email: React.RefObject<HTMLInputElement>;
  private password: React.RefObject<HTMLInputElement>;
  private passwordConfirmation: React.RefObject<HTMLInputElement>;

  constructor(props: LoginFormProps) {
    super(props);
    this.email = React.createRef();
    this.password = React.createRef();
    this.passwordConfirmation = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/users";
    const { token } = this.props;

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "text/vnd.turbo-stream.html",
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "user": {
          "email": this.email.current?.value,
          "password": this.password.current?.value,
          "password_confirmation": this.passwordConfirmation.current?.value
        }
      })
    })
    .then(response => {
      if (response.ok) {
        return response.text();
      }
      throw new Error("Network response was not ok.");
    })
    .then(Turbo.renderStreamMessage)
    .catch(error => console.log(error.message));
  }

  render() {
    return (
      <Box
        as={motion.div}
        bg='gray.50'
        p='4'
        whileHover={{ scale: 1.1 }}
        transition='0.1s linear'
      >
        <form action="/users" method="post" onSubmit={this.onSubmit}>
          <Box mb={8}>
          <FormControl>
            <FormLabel htmlFor='email'>Email address</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<EmailIcon color='gray.300' />}
                />
                <Input id='email' type='email' ref={this.email} />
              </InputGroup>
            <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
          </Box>
          <Box mb={8}>
            <FormControl>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input id='password' type='password' ref={this.password} />
              <FormHelperText>Make it hard to guess.</FormHelperText>
            </FormControl>
          </Box>
          <Box mb={8}>
            <FormControl>
              <FormLabel htmlFor='password-confirmation'>Password confirmation</FormLabel>
              <Input id='password-confirmation' type='password' ref={this.passwordConfirmation} />
              <FormHelperText>Make it hard to guess.</FormHelperText>
            </FormControl>
          </Box>
          <Button colorScheme='blue' onClick={this.onSubmit}>Submit</Button>
        </form>
      </Box>
    )}
}