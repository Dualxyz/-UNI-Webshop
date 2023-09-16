import { object, string, number } from "yup";

export const articleSchema = object({
  name: string().required("Name is required"),
  price: number()
    .required("Price is required")
    .moreThan(0, "Price must be a positive number"),
  quantity: number()
    .required("Quantity is required")
    .moreThan(0, "Quantity must be a positive number"),
  description: string()
    .required("Description is required")
    .max(120, "Description is too long"),
});
