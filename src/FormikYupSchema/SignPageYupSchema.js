import * as Yup from "yup";

import PasswordValidations from "./FormikYupStandards/PasswordValidations";
import { EmailValidations } from "./FormikYupStandards/EmailValidations";
import PhoneValidations from "./FormikYupStandards/PhoneValidations";



const SignPageYupSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .required("First name is a required field")
    .matches(/^[a-zA-Z ]*$/, "Name must contain only letters and spaces"),
  email: EmailValidations,
  phone_number: PhoneValidations,
  password: PasswordValidations
});
export { SignPageYupSchema }
