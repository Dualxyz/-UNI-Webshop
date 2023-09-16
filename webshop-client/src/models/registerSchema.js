import { object, string, date, number, ref } from "yup";
import { AllowedRoles } from "./userRole";

export const registerSchema = object({
  username: string().required("Username is required"),
  email: string().required("Email is required").email("Email is not valid"),
  password: string().required("Password is required"),
  confirmPassword: string()
    .required("Password confirmation is required")
    .oneOf([ref("password")], "Passwords must match"),
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  birthdate: date()
    .required("Birthdate is required")
    .max(new Date(), "Birthdate must be in the past"),
  address: string().required("Address is required"),
  role: number()
    .required("Role is required")
    .oneOf(AllowedRoles, "Role is not valid"),
});
