import React from "react";
import styles from "./CheckboxForm.module.css";
import { AssociateObject, Languages } from "@/app/types/AssociateType";

interface LanguageObj {
  name: string;
  value: string;
}

interface checkBoxProps {
  defaultCheckType: Array<any>;
  labelText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  values: Array<LanguageObj>;
}

const CheckBoxForm: React.FC<checkBoxProps> = (props) => {
  return (
    <>
      <label className={styles.label}>{props.labelText}</label>
      <div className={styles.inputPreview}>
        {props.values.map((valueObj: LanguageObj) => {
          return (
            <div>
              <input
                onChange={props.onChange}
                type="checkbox"
                id={valueObj.name}
                name={valueObj.name}
                className={styles.css_checkbox}
                defaultChecked={props.defaultCheckType.includes(valueObj.value)}
                value={valueObj.value}
              />

              <label htmlFor={valueObj.name}> {valueObj.value}</label>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CheckBoxForm;
