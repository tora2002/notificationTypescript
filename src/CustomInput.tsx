import React, { ChangeEvent } from "react";
import "./App.css";
import { Field, Label, Hint, Input } from "@zendeskgarden/react-forms";
import "@zendeskgarden/css-bedrock";

interface Props {
  name: string;
  hint: string;
  setInput: (value: string) => void;
}

const CustomInput: React.FC<Props> = ({ name, hint, setInput }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  return (
    <Field>
      <Label>{name}</Label>
      <Hint>{hint}</Hint>
      <Input onChange={handleInputChange} />
    </Field>
  );
};

export default CustomInput;
