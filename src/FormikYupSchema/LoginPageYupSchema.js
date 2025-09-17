import * as Yup from "yup";

import PasswordValidations from "./FormikYupStandards/PasswordValidations";



const LoginPageYupSchema = Yup.object().shape({
  emailorPhoneNumber: Yup.string()
  .test('is-email-or-phone', 'Invalid email or phone number format', value => {
    // Check if the input is a valid email or a valid phone number
    return Yup.string()
      .email()
      .isValidSync(value) || /^[0-9]{10}$/.test(value);
  })
  .required("Email or phone number is a required field"),
  password:PasswordValidations
});
export { LoginPageYupSchema }