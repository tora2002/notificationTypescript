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
import { Button } from '@zendeskgarden/react-buttons';

function App() {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  return (
    <ThemeProvider theme={DEFAULT_THEME}>
      <div className="heading">
        <Label id="title">Notifications and actions</Label>
        <Hint id="subtitle">Add alerts to set reminders or update upcoming policy deadlines.</Hint>
      </div>
      
      <Row className="box" justifyContent="start">
        <Col sm={5}>
          <CustomInput
            name={"Name"}
            hint={"Name of the alert"}
            setInput={setName}
          />
        </Col>
      </Row>
      <Row className="box" justifyContent="start">
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

      <Row className="box" justifyContent="start">
        <Col sm={5}>
          <MultiSelector />
        </Col>
      </Row>

      <Row className="box" justifyContent="start">
        <Col sm={5}>
          <ReminderSelector />
        </Col>
      </Row>

      <Row className="box-indented" justifyContent="start">
        <Col sm={5}>
          <ActionSelector />
        </Col>
        <Col sm={5}>
          <Field>
            <CustomInput
              name={"Change to..."}
              hint={"What does the tag change to?"}
              setInput={setDescription}
            />
          </Field>
          {/* <Field>
            <Input placeholder="placeholder" />
          </Field>  */}
        </Col>
      </Row>

      <Row className="box" justifyContent="start">
        <Col sm={5}>
          <MethodSelector />
        </Col>
      </Row>

      <Row>
        <Col textAlign="start">
          <Button className="addAlertButton">Add another alert</Button>
        </Col>
      </Row>
      
    </ThemeProvider>
  );
}

export default App;
