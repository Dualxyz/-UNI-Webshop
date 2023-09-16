import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import "../../style/Form.css";
import { articleSchema } from "../../models/articleSchema";

const ArticleForm = ({ handleSubmit, articleData }) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: articleData ? articleData.name : "",
        price: articleData ? articleData.price : "",
        quantity: articleData ? articleData.quantity : "",
        description: articleData ? articleData.description : "",
      }}
      validationSchema={articleSchema}
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
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              className={`border border-2 ${
                touched.name
                  ? errors.name
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            />
            {errors.name && touched.name ? (
              <div className="error-message">{errors.name}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Enter price"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.price}
              className={`border border-2 ${
                touched.price
                  ? errors.price
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            />
            {errors.price && touched.price ? (
              <div className="error-message">{errors.price}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              placeholder="Enter quantity"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.quantity}
              className={`border border-2 ${
                touched.quantity
                  ? errors.quantity
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            />
            {errors.quantity && touched.quantity ? (
              <div className="error-message">{errors.quantity}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="textarea"
              name="description"
              placeholder="Enter description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              className={`border border-2 ${
                touched.description
                  ? errors.description
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            />
            {errors.description && touched.description ? (
              <div className="error-message">{errors.description}</div>
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

export default ArticleForm;
