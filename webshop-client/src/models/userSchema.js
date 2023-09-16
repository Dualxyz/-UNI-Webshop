import { object, string, date } from "yup";

export const userSchema = object({
  username: string().required("Username is required"),
  email: string().required("Email is required").email("Email is not valid"),
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  birthdate: date()
    .required("Birthdate is required")
    .max(new Date(), "Birthdate must be in the past"),
  address: string().required("Address is required"),
});
