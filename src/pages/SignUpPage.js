import React, { useState } from "react";
import Header from "../components/common/header/Header";
import Button from "../components/common/button/Button";
import SignupForm from "../components/signupComponents/signupForm/SignupForm";
import LoginForm from "../components/signupComponents/loginForm/LoginForm";

const SignUp = () => {
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "1.5rem" }}>
        {!flag ? <h1>Signup</h1> : <h1>Login</h1>}
        {!flag ? <SignupForm /> : <LoginForm />}
        {!flag ? (
          <Button
            style={{ cursor: "pointer" }}
            onClick={() => setFlag(!flag)}
            text={"Already have an Account. Login"}
          />
        ) : (
          <Button
            className=""
            style={{ cursor: "pointer" }}
            onClick={() => setFlag(!flag)}
            text={"Signup"}
          />
        )}
      </div>
    </div>
  );
};

export default SignUp;
