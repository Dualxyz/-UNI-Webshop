import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import "../../style/Form.css";
import { verificationSchema } from "../../models/verificationSchema";
import {
  AllowedStatuses,
  statusIdToName,
} from "../../models/verificationStatus";

const VerificationForm = ({ handleSubmit, userData }) => {
  return (
    <Formik
      initialValues={{
        userId: userData ? userData.id : "",
        verificationStatus: "",
      }}
      validationSchema={verificationSchema}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm();
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
          <Form.Group className="mb-3" controlId="verificationStatus">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="verificationStatus"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.verificationStatus}
              className={`border border-2 ${
                touched.verificationStatus
                  ? errors.verificationStatus
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            >
              <option value="">Verify as</option>
              {AllowedStatuses.map((statusId) => (
                <option key={statusId} value={statusId}>
                  {statusIdToName(statusId)}
                </option>
              ))}
            </Form.Select>
            {errors.verificationStatus && touched.verificationStatus ? (
              <div className="error-message">{errors.verificationStatus}</div>
            ) : null}
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default VerificationForm;
