import React from "react";

interface Option {
  value: string;
  name: string;
}

interface MySelectProps {
  options: Option[];
  defaultValue: string;
  value: string;
  onChange: (selectedValue: string) => void;
}

const MySelect: React.FC<MySelectProps> = ({ options, defaultValue, value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option disabled value="">{defaultValue}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default MySelect;
