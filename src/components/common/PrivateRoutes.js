import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../firebase";
import { Comment } from "react-loader-spinner";

const PrivateRoutes = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
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
  } else if (!user || error) {
    return <Navigate to="/" replace />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoutes;
