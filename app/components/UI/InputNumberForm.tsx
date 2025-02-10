import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./InputNumberForm.module.css";

interface inputProps {
  htmlFor: string;
  labelText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  defaultValue: number;
  id: string;
}

const InputNumberForm: React.FC<inputProps> = (props) => {
  return (
    <>
      <label className={styles.label} htmlFor={props.htmlFor}>
        {props.labelText}
      </label>
      <input
        onChange={props.onChange}
        className={styles.editInput}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue || ""}
        type="number"
        id={props.id}
      />
    </>
  );
};

export default InputNumberForm;
