import { object, number } from "yup";
import { AllowedStatuses } from "./verificationStatus";

export const verificationSchema = object({
  userId: number().required("User is required"),
  verificationStatus: number()
    .required("Verification status is required")
    .oneOf(AllowedStatuses, "Verification status is not valid"),
});
