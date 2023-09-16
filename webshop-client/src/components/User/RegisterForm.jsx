import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import "../../style/Form.css";
import { registerSchema } from "../../models/registerSchema";
import { AllowedRoles, roleIdToName } from "../../models/userRole";

const RegisterForm = ({ handleRegister }) => {
  return (
    <Formik
      initialValues={{
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        birthdate: "",
        address: "",
        role: "",
      }}
      validationSchema={registerSchema}
      onSubmit={(values) => {
        handleRegister(values);
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
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              className={`border border-2 ${
                touched.username
                  ? errors.username
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            />
            {errors.username && touched.username ? (
              <div className="error-message">{errors.username}</div>
            ) : null}
          </Form.Group>

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

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              className={`border border-2 ${
                touched.confirmPassword
                  ? errors.confirmPassword
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div className="error-message">{errors.confirmPassword}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              className={`border border-2 ${
                touched.firstName
                  ? errors.firstName
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            />
            {errors.firstName && touched.firstName ? (
              <div className="error-message">{errors.firstName}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
              className={`border border-2 ${
                touched.lastName
                  ? errors.lastName
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            />
            {errors.lastName && touched.lastName ? (
              <div className="error-message">{errors.lastName}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="birthdate">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="birthdate"
              placeholder="Enter your date of birth"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.birthdate}
              className={`border border-2 ${
                touched.birthdate
                  ? errors.birthdate
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            />
            {errors.birthdate && touched.birthdate ? (
              <div className="error-message">{errors.birthdate}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Enter your address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
              className={`border border-2 ${
                touched.address
                  ? errors.address
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            />
            {errors.address && touched.address ? (
              <div className="error-message">{errors.address}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Select
              name="role"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.role}
              className={`border border-2 ${
                touched.role
                  ? errors.role
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            >
              <option value="">Register as</option>
              {AllowedRoles.map((roleId) => (
                <option key={roleId} value={roleId}>
                  {roleIdToName(roleId)}
                </option>
              ))}
            </Form.Select>
            {errors.role && touched.role ? (
              <div className="error-message">{errors.role}</div>
            ) : null}
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
