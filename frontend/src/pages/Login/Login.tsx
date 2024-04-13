import { FormEvent, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";

import { userService } from "@/services/userService";
import { User } from "@/types/user";

import styles from "./Login.module.css";

export function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<ReCAPTCHA>(null);

  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const user: User = {
      email: emailRef.current!.value,
      password: passwordRef.current!.value
    };
    const captcha = captchaRef.current!.getValue()!;

    try {
      const res = await userService.login(user, captcha);
      console.log(res.status);
    } catch (error) {
      const e = error as Error;
      setErrorMessage(() => e.message);
    }
  }

  function isValidEmail(email: string) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  function handleEmailChange() {
    setIsEmailValid(() => isValidEmail(emailRef.current?.value ?? ""));
  }

  function handlePasswordChange() {
    setIsPasswordValid(() => (passwordRef.current?.value.length ?? 0) >= 8);
  }

  function handleCaptchaChange(value: string | null) {
    setIsCaptchaValid(() => value !== null);
  }

  return (
    <div className={`d-flex align-items-center justify-content-center ${styles.login}`}>
      <Form className={styles.form} onSubmit={e => handleSubmit(e)}>
        {errorMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            {errorMessage}
          </div>
        )}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={() => handleEmailChange()}
            ref={emailRef}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mt-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={() => handlePasswordChange()}
            ref={passwordRef}
            required
          />
        </Form.Group>

        <div className="mt-3 d-flex align-items-center justify-content-center ">
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
            ref={captchaRef}
            onChange={e => handleCaptchaChange(e)}
          />
        </div>

        <Button
          className="mt-4 w-100"
          variant="primary"
          type="submit"
          disabled={!isEmailValid || !isPasswordValid || !isCaptchaValid}
        >
          Login
        </Button>

        <div className="text-center mt-3">
          <Link className="text-body-secondary" to="/registration">
            Create an account
          </Link>
        </div>
      </Form>
    </div>
  );
}
