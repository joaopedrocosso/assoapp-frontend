import React from "react";
import styles from "./DropboxForm.module.css";

interface dropBoxProps {
  htmlFor: string;
  labelText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  values: Array<string>;
  defaultValue: string;
  id: string;
  list: string;
}

const DropBoxForm: React.FC<dropBoxProps> = (props) => {
  return (
    <>
      <label className={styles.label} htmlFor={props.htmlFor}>
        {props.labelText}
      </label>
      <input
        className={styles.editInput}
        list={props.list}
        id={props.id}
        name={props.name}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      />
      <datalist id={props.list}>
        {props.values.map((value) => {
          return <option value={value}></option>;
        })}
      </datalist>
    </>
  );
};

export default DropBoxForm;
