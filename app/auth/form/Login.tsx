"use client";

import Input from "@/global/components/Input";
import Loader from "@/global/components/Loader";
import Alert from "@/global/error-alert/Alert";
import { manageLogin } from "@/scripts/login";
import { AlertContentProps } from "@/types/AlertContentProps.type";
import { useEffect, useRef, useState } from "react";

const LoginForm = ({
  redirectOnSuccess = "/account",
}: {
  redirectOnSuccess?: string | undefined;
}) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertContentProps>({
    status: 0,
    message: "",
    success: false,
    closeAlert: true,
  });

  const loginRef = useRef<HTMLButtonElement>(null);


  useEffect(() => {
    // On enter, click login button
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        loginRef.current?.click();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [])

  return (
    <>
      <Alert alert={alert} setAlert={setAlert} />
      {loading && <Loader loading={loading} title="Logging in" message="Please wait while we log you in..." />}
      <div className="inputs-container">
        <div className="global__input__container two-columns">
          <div className="inputs-container global__input">
            <Input
              label="Customer ID"
              type="text"
              name="customerID"
              required={true}
              maxLength={100}
              fitContent={false}
              editMode={true}
              onChange={() => { }}
            />
          </div>
          <div className="inputs-container global__input">
            <Input
              label="Identifier"
              type="text"
              name="identifier"
              required={true}
              maxLength={9}
              fitContent={false}
              autoComplete={false}
              editMode={true}
              onChange={() => { }}
            />
          </div>
        </div>
        <div className="inputs-container">
          <Input
            label="Password"
            type="password"
            name="password"
            required={true}
            maxLength={100}
            fitContent={false}
          />
        </div>
      </div>
      <div className="buttons-container">
        <button
          className="primary-button text-size-20 width-100-auto"
          onClick={async () => {
            
            await manageLogin(setLoading, setAlert, redirectOnSuccess);
          }}
          ref={loginRef}
        >
          <span
            style={{
              display: loading ? "none" : "block",
            }}
          >
            Log in
          </span>

        </button>
        <span className="separator">Or</span>
        <button className="secondary-button  text-size-20 width-100-auto" onClick={() => {
          // Redirect to register form to ./auth?form=register
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set("form", "register");
          window.location.href = newUrl.toString();
        }}>
          Create an account
        </button>
      </div>
    </>
  );
};

export default LoginForm;
