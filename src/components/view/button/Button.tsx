import React, { ButtonHTMLAttributes } from "react";
import classes from "./Button.module.css";

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const MyButton: React.FC<MyButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className={classes.myBtn}>
      {children}
    </button>
  );
};

export default MyButton;
