import { object, string, number } from "yup";

export const orderSchema = object({
  quantity: number()
    .required("Quantity is required")
    .moreThan(0, "Quantity must be a positive number"),
  comment: string().max(60, "Comment is too long"),
  address: string()
    .required("Address is required")
    .max(30, "Address is too long"),
  articleId: number().required("Article is required"),
});
