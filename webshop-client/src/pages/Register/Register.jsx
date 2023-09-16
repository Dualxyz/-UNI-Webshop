import React, { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import RegisterForm from "../../components/User/RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, resetState } from "../../features/auth/authSlice";
import { registerRequestDto } from "../../models/registerDto";
import { notifySuccess, notifyError } from "../../utils/notify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      notifyError(message);
    }

    if (isSuccess) {
      notifySuccess(message);
      navigate("/login");
    }

    dispatch(resetState());
  }, [userInfo, isError, isSuccess, message, navigate, dispatch]);

  const handleRegister = (data) => {
    const dto = registerRequestDto(data);
    dispatch(registerUser(dto));
  };

  return (
    <div className="mb-5">
      <h1>Register</h1>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <RegisterForm handleRegister={handleRegister} />
      )}
    </div>
  );
};

export default Register;
