import React, { useState } from "react";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../slices/userSlice";
import { toast } from "react-toastify";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    // console.log("hi2");
    setLoading(true);
    if(email && password){
        try {
            const userCredential = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );
            const user = userCredential.user;
      
            const userDoc = await getDoc(doc(db, "user", user.uid));
            const userData = userDoc.data();
          //   console.log(userData);
            dispatch(
              setUser({
                name: userData.name,
                email: user.email,
                uid: user.uid,
              })
            );
            toast.success("your are logged in successfully");
            setLoading(false);
            navigate("/profile");
          } catch (e) {
            console.log(e);
            setLoading(false);
            toast.error(e.message);
          }
    } else {
        toast.warning("put your email and passwoard");
        setLoading(false)
    }
    
  };

  return (
    <>
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

      <Button text={loading ?"Loading...":"Login"} onClick={handleLogin} disabled={loading} />
    </>
  );
};

export default LoginForm;
