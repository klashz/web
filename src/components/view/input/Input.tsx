import React, { InputHTMLAttributes } from "react";
import classes from "./Input.module.css";

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const MyInput: React.FC<MyInputProps> = (props) => {
  return (
    <input aria-label="exists" className={classes.myInput} {...props} />
  );
};

export default MyInput;
