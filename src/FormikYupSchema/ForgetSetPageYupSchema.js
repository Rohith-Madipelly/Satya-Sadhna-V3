import * as Yup from "yup";

import { EmailValidations } from "./FormikYupStandards/EmailValidations";
import PasswordValidations from "./FormikYupStandards/PasswordValidations";




const ForgetSetPageYupSchema = Yup.object().shape({
  email: EmailValidations,
  password: PasswordValidations,
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords must match")
    .required("Password confirmation is required")
});
export { ForgetSetPageYupSchema }
