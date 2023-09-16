import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import "../../style/Form.css";
import { orderSchema } from "../../models/orderSchema";

const OrderForm = ({ handleSubmit, articles }) => {
  return (
    <Formik
      initialValues={{
        quantity: "",
        comment: "",
        address: "",
        articleId: "",
      }}
      validationSchema={orderSchema}
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

          <Form.Group className="mb-3" controlId="comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type="text"
              name="comment"
              placeholder="Enter comment"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.comment}
              className={`border border-2 ${
                touched.comment
                  ? errors.comment
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            />
            {errors.comment && touched.comment ? (
              <div className="error-message">{errors.comment}</div>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Enter address"
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

          <Form.Group className="mb-3" controlId="articleId">
            <Form.Label>Article</Form.Label>
            <Form.Select
              name="articleId"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.articleId}
              className={`border border-2 ${
                touched.articleId
                  ? errors.articleId
                    ? "border-danger"
                    : "border-success"
                  : ""
              }`}
            >
              <option value="">Select article</option>
              {articles.map((article) => (
                <option key={article.id} value={article.id}>
                  {article.name} ({article.quantity} on stock / ${article.price}
                  )
                </option>
              ))}
            </Form.Select>
            {errors.articleId && touched.articleId ? (
              <div className="error-message">{errors.articleId}</div>
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

export default OrderForm;
