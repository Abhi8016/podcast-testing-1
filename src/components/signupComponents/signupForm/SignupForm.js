import React, { useState } from "react";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import { auth, db } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async () => {
    // console.log("hi");
    setloading(true);
    if (
      password === confirmPassword &&
      password.length > 6 &&
      fullName &&
      email
    ) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log(user);
        await setDoc(doc(db, "user", user.uid), {
          name: fullName,
          email: user.email,
          uid: user.uid,
        });

        dispatch(
          setUser({
            name: fullName,
            email: user.email,
            uid: user.uid,
          })
        );
        setloading(false);
        navigate("/profile");
        toast.success("Welcome to podcast platform");
      } catch (e) {
        console.log(e);
        toast.error(e.message);
        setloading(false);
      }
    } else {
      if (fullName === "" && email == "") {
        toast.error("Nmae and email can not be empty");
      }
      if (password !== confirmPassword) {
        toast.error("You have to write same password as in the password bar");
      } else if (password.length < 6) {
        toast.error("Make sure your password length is atleast 7");
      }
      setloading(false);
    }
  };
  return (
    <>
      <Input
        state={fullName}
        setState={setFullName}
        placeholder="Enter your full name"
        type="text"
        required={true}
      />
      <Input
        state={email}
        setState={setEmail}
        placeholder="Enter email address"
        type="text"
        required={true}
      />
      <Input
        state={password}
        setState={setPassword}
        placeholder="Set your password"
        type="password"
        required={true}
      />
      <Input
        state={confirmPassword}
        setState={setconfirmPassword}
        placeholder="Confirm your password"
        type="password"
        required={true}
      />
      <Button
        text={loading ? "Loading..." : "Signup"}
        disabled={loading}
        onClick={handleSignup}
      />
    </>
  );
};

export default SignupForm;
