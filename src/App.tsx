import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Field, Label, Hint, Input } from "@zendeskgarden/react-forms";
import { Row, Col } from "@zendeskgarden/react-grid";
import "@zendeskgarden/css-bedrock";
import MultiSelector from "./MultiSelector";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
import ReminderSelector from "./ReminderSelector";
import CustomInput from "./CustomInput";
import ActionSelector from "./ActionSelector";
import MethodSelector from "./MethodSelector";

function App() {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  return (
    <ThemeProvider theme={DEFAULT_THEME}>
      <Row justifyContent="center">
        <Col sm={5}>
          <CustomInput
            name={"name"}
            hint={"Name of the alert"}
            setInput={setName}
          />
        </Col>
      </Row>
      <Row justifyContent="center">
        <Col sm={5}>
          <Field>
            <CustomInput
              name={"Description"}
              hint={"Brief Alert Description"}
              setInput={setDescription}
            />
          </Field>
        </Col>
      </Row>
      <MultiSelector />
      <Row>
        <Col sm={5}>
          <ReminderSelector />
        </Col>
        <Field>
          <Input placeholder="placeholder" />
        </Field>
      </Row>
      <ActionSelector />
      <MethodSelector />
    </ThemeProvider>
  );
}

export default App;
