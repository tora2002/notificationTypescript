import React, { ChangeEvent } from "react";
import "./App.css";
import { Field, Label, Hint, Input } from "@zendeskgarden/react-forms";
import "@zendeskgarden/css-bedrock";

interface Props {
  name: string;
  setInput: (value: string) => void;
  value: string; 
}

const CustomInput: React.FC<Props> = ({ name, setInput, value }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  return (
    <Field>
      <Label>{name}</Label>
      <Input value={value} onChange={handleInputChange} /> 
    </Field>
  );
};

export default CustomInput;

