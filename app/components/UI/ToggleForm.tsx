import React from "react";
import styles from "./ToggleForm.module.css";

interface toggleFormInput {
  labelText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultChecked: boolean;
}

const ToggleForm: React.FC<toggleFormInput> = (props) => {
  return (
    <>
      <label className={styles.label}>{props.labelText}</label>
      <label className={styles.switch}>
        <input
          onChange={props.onChange}
          defaultChecked={props.defaultChecked}
          type="checkbox"
        />
        <span className={`${styles.slider} ${styles.round}`} />
      </label>
    </>
  );
};

export default ToggleForm;
