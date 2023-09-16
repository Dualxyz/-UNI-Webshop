import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import { loginSchema } from "../../models/loginSchema";

// import { useSelector } from "react-redux";
// import Spinner from "react-bootstrap/Spinner";

const LoginForm = ({ handleLogin }) => {
  // const { isLoading } = useSelector((state) => state.auth);

  // if (isLoading) {
  //   return (
  //     <Spinner animation="border" role="status">
  //       <span className="visually-hidden">Loading...</span>
  //     </Spinner>
  //   );
  // }

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={(values) => {
        handleLogin(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className={`border border-2 ${
                touched.email
                  ? errors.email
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            />
            {errors.email && touched.email ? (
              <div className="error-message">{errors.email}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className={`border border-2 ${
                touched.password
                  ? errors.password
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            />
            {errors.password && touched.password ? (
              <div className="error-message">{errors.password}</div>
            ) : null}
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
