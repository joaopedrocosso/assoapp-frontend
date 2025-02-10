import React from "react";
import styles from "./TextAreaForm.module.css";

interface inputProps {
  htmlFor: string;
  labelText: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  defaultValue: string;
  id: string;
}

const FormInput: React.FC<inputProps> = (props) => {
  return (
    <>
      <label className={styles.label} htmlFor={props.htmlFor}>
        {props.labelText}
      </label>
      <textarea
        className={styles.editTextArea}
        placeholder={props.placeholder || ""}
        defaultValue={props.defaultValue}
        id={props.id}
        onChange={props.onChange}
      />
    </>
  );
};

export default FormInput;
