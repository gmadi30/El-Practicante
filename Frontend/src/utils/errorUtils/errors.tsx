import { ErrorBase } from "./errorBase";
import { ErrorName } from "../../types/types";
import { Dispatch, SetStateAction } from "react";

export class FetchError extends ErrorBase<ErrorName> {}

export default function validatePassword(
  password: string,
  setPasswordIsValid: Dispatch<SetStateAction<boolean>>
): string | boolean {
  console.log("[Erros][validatePassword] Entrada", password);
  const minLength = 6;
  const maxLength = 64;
  let response = "";

  if (password.length < minLength) {
    response = `La contraseña debe tener al menos ${minLength} caracteres.`;
  }

  if (password.length > maxLength) {
    response = `La contraseña no debe exceder los ${maxLength} caracteres.`;
  }

  const passwordPattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
  const digitPattern = /(?=.*\d)/;
  const lowercasePattern = /(?=.*[a-z])/;
  const uppercasePattern = /(?=.*[A-Z])/;
  const specialCharPattern = /(?=.*[!@#$%^&*])/;

  if (!passwordPattern.test(password)) {
    if (!digitPattern.test(password)) {
      response = "La contraseña debe contener al menos un dígito (0-9).";
    }
    if (!lowercasePattern.test(password)) {
      response =
        "La contraseña debe contener al menos una letra minúscula (a-z).";
    }
    if (!uppercasePattern.test(password)) {
      response =
        "La contraseña debe contener al menos una letra mayúscula (A-Z).";
    }
    if (!specialCharPattern.test(password)) {
      response =
        "La contraseña debe contener al menos un carácter especial (!@#$%^&*).";
    }
  } else {
    setPasswordIsValid(true);
    return true;
  }

  console.log("[Erros][validatePassword] Salida", response);

  return response;
}
