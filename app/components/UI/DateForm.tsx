import React from "react";
import styles from "./DateForm.module.css";

interface dateFormProps {
  htmlFor: string;
  labelText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  defaultValue: string;
  id: string;
  name: string;
}

const DateForm: React.FC<dateFormProps> = (props) => {
  return (
    <>
      <label className={styles.label} htmlFor={props.htmlFor}>
        {props.labelText}
      </label>
      <input
        onChange={props.onChange}
        className={styles.editInput}
        type="date"
        id={props.id}
        name={props.name}
        defaultValue={props.defaultValue}
      />
    </>
  );
};

export default DateForm;
