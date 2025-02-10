import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import styles from "./FormInput.module.css";

interface inputProps {
  htmlFor: string;
  labelText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  defaultValue: string;
  id: string;
  isRequired: boolean;
  isCPF: boolean;
  isEmail: boolean;
}

const FormInput: React.FC<inputProps> = (props) => {
  const [isInvalid, setIsInvalid] = useState<boolean>();
  const [isCPFInvalid, setIsCPFInvalid] = useState<boolean | undefined>();
  const [isEmailInvalid, setIsEmailInvalid] = useState<boolean | undefined>();

  const checksIfEmpty = (value: string | null) => {
    if (value == "") {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  };

  const checksIfEmailIsValid = (value: string | null) => {
    let isValid = value?.includes("@") && value.includes(".");
    setIsEmailInvalid(!isValid);
  };

  const checksIfCPFIsValid = (value: string | null) => {
    let cpfOnlyNumbers =
      typeof value == "string" ? value.replace(/\D/g, "") : "";
    if (cpfOnlyNumbers !== null) {
      var Soma;
      var Resto;
      Soma = 0;
      if (cpfOnlyNumbers == "00000000000") return false;

      for (let i = 1; i <= 9; i++)
        Soma = Soma + parseInt(cpfOnlyNumbers.substring(i - 1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;

      if (Resto == 10 || Resto == 11) Resto = 0;
      if (Resto != parseInt(cpfOnlyNumbers.substring(9, 10))) return false;

      Soma = 0;
      for (let i = 1; i <= 10; i++)
        Soma = Soma + parseInt(cpfOnlyNumbers.substring(i - 1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;

      if (Resto == 10 || Resto == 11) Resto = 0;
      if (Resto != parseInt(cpfOnlyNumbers.substring(10, 11))) return false;
      return true;
    }
  };

  const checksIfValid = (value: string | null) => {
    checksIfEmpty(value);
    if (props.isCPF) {
      setIsCPFInvalid(!checksIfCPFIsValid(value));
    }
    if (props.isEmail) {
      checksIfEmailIsValid(value);
    }
  };

  return (
    <>
      <label className={styles.label} htmlFor={props.htmlFor}>
        {props.labelText}
      </label>
      <input
        onChange={props.onChange}
        className={` ${
          isInvalid
            ? `${styles.editInput} ${styles.requiredInput}`
            : `${styles.editInput}`
        }`}
        placeholder={props.placeholder}
        onBlur={(event) => {
          checksIfValid(event.target.value);
        }}
        defaultValue={props.defaultValue || ""}
        id={props.id}
      />
      {isInvalid ? (
        <p className={styles.required}>Esse é um campo obrigatório!</p>
      ) : (
        ""
      )}
      {isCPFInvalid ? <p className={styles.required}>O CPF é inválido.</p> : ""}
      {isEmailInvalid ? (
        <p className={styles.required}>O email é inválido.</p>
      ) : (
        ""
      )}
    </>
  );
};

export default FormInput;
