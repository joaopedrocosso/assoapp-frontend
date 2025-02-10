import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./EditInput.module.css";
import { AssociateObject } from "@/app/types/AssociateType";

interface inputProps {
  placeholder: string;
  value: string;
  id: string;
  onChange: React.Dispatch<React.SetStateAction<AssociateObject>>;
  changed: AssociateObject;
  fieldChanged: string;
}

const Input: React.FC<inputProps> = (props) => {
  const handleEditInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChange({
      id: props.changed.id,
      data: { ...props.changed.data, fullName: event.target.value },
    });
  };

  return (
    <>
      <input
        type="text"
        className={styles.editInput}
        defaultValue={props.value}
        placeholder={props.placeholder}
        itemID={props.id}
        onChange={handleEditInputChange}
      />
    </>
  );
};

export default Input;
