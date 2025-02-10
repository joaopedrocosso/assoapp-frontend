import React from "react";
import styles from "./SpanButton.module.css";

interface navProps {
  text: string;
  img: string;
  background: boolean;
  onClick: () => void;
}

const SpanButton: React.FC<navProps> = (props) => {
  return (
    <div className={styles.nav} onClick={props.onClick}>
      <span
        className={
          props.background
            ? styles.nav__spanButton_text_background
            : styles.nav__spanButton_text
        }
      >
        {props.text}
      </span>
      {props.img ? (
        <img className={styles.nav__profilePic} src={props.img} alt="" />
      ) : (
        ""
      )}
    </div>
  );
};

export default SpanButton;
