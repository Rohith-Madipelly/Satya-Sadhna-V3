import * as Yup from "yup";

// Reusable checks
const validExtensions = ["com", "org", "net", "edu", "gov", "mil", "in", "us", "uk", "au", "ca", "eu"];

const phoneRegex = /^[6-9][0-9]{9}$/;

export const EmailPhoneValidationsBoth = Yup.string()
  .required("This field is required.")
  .trim()
  .test("email-or-phone", "Enter a valid phone number or email address", (value) => {
    if (!value) return false;

    // PHONE validation
    if (phoneRegex.test(value)) {
      return true;
    }

    // EMAIL validation
    const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      return false;
    }

    // Additional email extension check
    const domainParts = value.split(".");
    const extension = domainParts.pop();
    if (!extension || !validExtensions.includes(extension)) {
      return false;
    }

    return true;
  });

