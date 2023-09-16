import React, { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import LoginForm from "../../components/User/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, resetState } from "../../features/auth/authSlice";
import { loginRequestDto } from "../../models/loginDto";
import { notifyError } from "../../utils/notify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      notifyError(message);
    }

    if (isSuccess && userInfo) {
      navigate("/dashboard");
    }

    dispatch(resetState());
  }, [userInfo, isError, isSuccess, message, navigate, dispatch]);

  const handleLogin = (data) => {
    const dto = loginRequestDto(data);
    dispatch(loginUser(dto));
  };

  return (
    <div className="mb-5">
      <h1>Login</h1>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <LoginForm handleLogin={handleLogin} />
      )}
    </div>
  );
};

export default Login;
