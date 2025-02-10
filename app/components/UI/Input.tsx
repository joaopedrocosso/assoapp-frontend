import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./Input.module.css";

interface inputProps {
  placeholder: string;
  value: string | null;
  disabled: boolean;
  id: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<inputProps> = (props) => {
  return (
    <>
      {props.value !== "" ? (
        <input
          onChange={props.onChange}
          className={styles.searchInput}
          placeholder={props.placeholder}
          value={props.value ? props.value : ""}
          disabled={props.disabled}
          itemID={props.id}
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
      ) : (
        <input
          onChange={props.onChange}
          className={styles.searchInput}
          placeholder={props.placeholder}
          disabled={props.disabled}
          itemID={props.id}
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
      )}
    </>
  );
};

export default Input;
