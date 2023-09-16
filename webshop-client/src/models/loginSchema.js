import { object, string } from "yup";

export const loginSchema = object({
  email: string().required("Email is required").email("Email is not valid"),
  password: string().required("Password is required"),
});
