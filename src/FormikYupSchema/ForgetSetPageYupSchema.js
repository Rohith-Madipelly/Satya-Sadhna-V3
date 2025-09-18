import * as Yup from "yup";

import { EmailValidations } from "./FormikYupStandards/EmailValidations";
import PasswordValidations from "./FormikYupStandards/PasswordValidations";




const ForgetSetPageYupSchema = Yup.object().shape({
  email: EmailValidations,
  oldPassword: PasswordValidations.required("Old Password is required"),
  password: PasswordValidations,
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords must match")
    .required("Re-enter password is required")
});
export { ForgetSetPageYupSchema }
