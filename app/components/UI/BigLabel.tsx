import React from "react";
import styles from "./BigLabel.module.css";

interface bigLabelProps {
  labelText: string;
}

const BigLabel: React.FC<bigLabelProps> = (props) => {
  return (
    <>
      <label className={`${styles.labelTitle} ${styles.bigTitle}`}>
        {props.labelText}
      </label>
    </>
  );
};

export default BigLabel;
