"use client";

import Input from "@/global/components/Input";
import Switch from "@/global/components/Switch";
import axios from "axios";
import { useState } from "react";

const RegisterForm = () => {

  const [
    userData, setUserData
  ] = useState<{
    firstName?: string;
    lastName?: string;
    birthdate?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
    acceptTerms?: boolean;
    acceptEmails?: boolean;
  }>({});

  return (
    <>
      <div className="inputs-container two-columns" id="register-name-birthdate">
        <div className="inputs-container">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            required
            maxLength={100}
            fitContent={false}
            autoComplete={false}
            onChange={(e: React.ChangeEvent<HTMLInputElement> | string) => {
              const value = typeof e === "string" ? e : e.target.value;
              const d = { ...userData } as typeof userData;
              d.firstName = value;
              setUserData(d);
            }}
          />
        </div>
        <div className="inputs-container">
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            required
            maxLength={100}
            fitContent={false}
            autoComplete={false}
            onChange={(e: React.ChangeEvent<HTMLInputElement> | string) => {
              const value = typeof e === "string" ? e : e.target.value;
              const d = { ...userData } as typeof userData;
              d.lastName = value;
              setUserData(d);
            }}
          />
        </div>
        <div className="inputs-container">
          <Input
            label="Birth Date"
            type="date"
            name="birthDate"
            required
            maxLength={100}
            fitContent={false}
            autoComplete={false}
            onChange={(e: React.ChangeEvent<HTMLInputElement> | string) => {
              const value = typeof e === "string" ? e : e.target.value;
              console.log("Birth Date value:", value);
              const d = { ...userData } as typeof userData;
              d.birthdate = value;
              setUserData(d);
              console.log("Updated userData:", d);
            }}
          />
        </div>
      </div>
      <div className="inputs-container two-columns">
        <Input
          label="Email"
          type="email"
          name="email"
          required
          maxLength={100}
          autoComplete={false}
          fitContent={false}
          onChange={(e: React.ChangeEvent<HTMLInputElement> | string) => {
            const value = typeof e === "string" ? e : e.target.value;
            const d = { ...userData } as typeof userData;
            d.email = value;
            setUserData(d);
          }}
        />
      </div>
      <div className="inputs-container two-columns">
        <Input
          label="Password"
          type="password"
          name="password"
          required
          maxLength={100}
          fitContent={false}
          autoComplete={false}
          displayMaxChar={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement> | string) => {
            const value = typeof e === "string" ? e : e.target.value;
            const d = { ...userData } as typeof userData;
            d.password = value;
            setUserData(d);
          }}
        />
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          required
          maxLength={100}
          fitContent={false}
          autoComplete={false}
          displayMaxChar={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement> | string) => {
            const value = typeof e === "string" ? e : e.target.value;
            const d = { ...userData } as typeof userData;
            d.passwordConfirm = value;
            setUserData(d);
          }}
        />
      </div>

      <div className="global__terms__and__conditions">
        <Switch
          label="I agree to Terms of Service and Privacy Policy"
          description={<>I agree to <a href="https://naflows.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="https://naflows.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></>}
          checked={userData.acceptTerms || false}
          onChange={(e: React.ChangeEvent<HTMLInputElement> | boolean) => {
            const value = typeof e === "boolean" ? e : e.target.checked;
            if (value != userData.acceptTerms) {
              const d = { ...userData } as typeof userData;
              d.acceptTerms = value;
              setUserData(d);
            }
          }}
        />
        <Switch
          label="I want to receive email updates & promotions"
          description="Naflows will send you occasional updates, promotions, and details about offers, trials, and new content."
          checked={userData.acceptEmails || false}
          onChange={(e: React.ChangeEvent<HTMLInputElement> | boolean) => {
            const value = typeof e === "boolean" ? e : e.target.checked;
            if (value != userData.acceptEmails) {
              const d = { ...userData } as typeof userData;
              d.acceptEmails = value;
              setUserData(d);
            }
          }}
        />
      </div>

      <div className="buttons-container">
        <button
          className={`primary-button text-size-20 width-100-auto ${!(userData.acceptTerms && userData.password && userData.passwordConfirm && userData.email && userData.firstName && userData.lastName && userData.birthdate && (userData.password === userData.passwordConfirm)) ? "inactive" : ""}`}
          onClick={async () => {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_DUMMY_API_URL_DEV}/user/secure/register`, {
              firstName: userData.firstName,
              lastName: userData.lastName,
              birthdate: userData.birthdate,
              email: userData.email,
              password: userData.password,
              passwordConfirm: userData.passwordConfirm,
              acceptEmails: userData.acceptEmails,
            }, {
              withCredentials: true,
            });
            if (res.status === 200) {
              window.location.href = "/auth?form=login&reason=registered";
            }
          }}
        >
          Register
        </button>
        <span className="separator">Or</span>
        <button className="tertiary-button  text-size-20 width-100-auto" onClick={() => {
          // Redirect to login form to ./auth?form=login
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set("form", "login");
          window.location.href = newUrl.toString();
        }}>
          Log in
        </button>
      </div>
    </>
  );
};

export default RegisterForm;
