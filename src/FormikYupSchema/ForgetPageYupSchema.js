import * as Yup from "yup";

import PasswordValidations from "./FormikYupStandards/PasswordValidations";
import { EmailValidations } from "./FormikYupStandards/EmailValidations";
import PhoneValidations from "./FormikYupStandards/PhoneValidations";



const ForgetPageYupSchema = Yup.object().shape({
  email: EmailValidations,
});
export { ForgetPageYupSchema }
