import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/common/header/Header";
import { Comment } from "react-loader-spinner";
import Button from "../components/common/button/Button";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  if (!user) {
    return (
      <div className="center1">
        <Comment
          visible={true}
          height="80"
          width="80"
          ariaLabel="comment-loading"
          wrapperStyle={{}}
          wrapperClass="comment-wrapper"
          color="#009AFE"
          backgroundColor="#fff"
        />
      </div>
    );
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <Header />
      <div className="input-wrapper">
        <h1>Welcome {user.name} !!!</h1>
        <h1>Your login id : {user.email}</h1>
        <Button text={"Logout"} onClick={handleLogout} />
      </div>
    </>
  );
};

export default Profile;
