import logo from "./logo.svg";
import React, { useRef, useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import "./App.css";
import { Item, Menu, Label as DropLabel, Field as DropField, Dropdown, Autocomplete } from '@zendeskgarden/react-dropdowns';
import { Field, Label, Hint, Input, Toggle } from "@zendeskgarden/react-forms";
import { Row, Col, Grid } from "@zendeskgarden/react-grid";
import "@zendeskgarden/css-bedrock";
import MultiSelector from "./MultiSelector";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
import ReminderSelector from "./ReminderSelector";
import CustomInput from "./CustomInput";
import ActionSelector from "./ActionSelector";
import MethodSelector from "./MethodSelector";
import { Button, Anchor, IconButton } from '@zendeskgarden/react-buttons';
import { AccordionContainer } from '@zendeskgarden/container-accordion';
import { SM, MD, LG, XL, XXL, XXXL } from '@zendeskgarden/react-typography';
import { ReactComponent as TrashIcon } from '@zendeskgarden/svg-icons/src/16/trash-stroke.svg';
import ActionTable from "./ActionTable";

const SLAConditions = [
  "Before breach",
  "After breach",
  "At breach",
];



function App() {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [hours, setHours] = React.useState("");
  const [minutes, setMinutes] = React.useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState("Time since breach");
  const [matchingOptions, setMatchingOptions] = useState(SLAConditions);

  const [action, setAction] = useState("");
  const [who, setWho] = useState("");
  const [matchingActions, setMatchingActions] = useState(["Email", "SMS", "Ticket assignment"]);
  const filterMatchingOptionsRef = useRef(
    debounce((value: string) => {
      const matchedOptions = SLAConditions.filter(
        option => option.trim().toLowerCase().indexOf(value.trim().toLowerCase()) !== -1
      );

      setMatchingOptions(matchedOptions);
    }, 300)
  );
  useEffect(() => {
    filterMatchingOptionsRef.current(inputValue);
  }, [inputValue]);
  return (
    <ThemeProvider theme={DEFAULT_THEME}>
      <div className="container">
        <Grid>
          <Row className="box">
            <Col>
              <Label id="subtitle">Set timed actions</Label>
              <div style={{ paddingTop: "10px" }}> </div>
              <Hint id="subtitle">Add actions like email notifications and ticket assignments to help avoid an SLA breach.</Hint>
            </Col>
            <Button >Add action</Button>
          </Row>
          <div className="divider"></div>
          <Row className="box" >
            <Col sm={7}>
              <CustomInput
                name={"Action Name"}
                setInput={setName}
              />
            </Col>
          </Row>
          <Row className="box">
            <Col sm={10}>
              <Field>
                <CustomInput
                  name={"Description"}
                  setInput={setDescription}
                />
              </Field>
            </Col>
          </Row>
          <Row className="box">
            <Field>
              <Toggle>
                <Label isRegular style={{ marginLeft: "10px" }}>Set as active</Label>
              </Toggle>
            </Field>
          </Row>
          <Row className="box">
            <Col>
              <LG>SLA Conditions </LG>
              <div style={{ paddingTop: "10px" }}> </div>
              <Hint>Define when the timed action or notification should occur</Hint>
            </Col>
          </Row>
          <Row className="box">
            <Col>
              <MD>Meet ANY of the following SLA conditions</MD>
            </Col>
          </Row>

          <div className="parent-box flex-row-container box">
            <div className="sub-container flex-row-container">
              <div className="child-box big">
                <Dropdown
                  inputValue={inputValue}
                  selectedItem={selectedItem}
                  onSelect={item => setSelectedItem(item)}
                  onInputValueChange={value => setInputValue(value)}
                  downshiftProps={{ defaultHighlightedIndex: 0 }}
                >
                  <DropField>
                    <DropLabel>Time</DropLabel>
                    <Autocomplete>{selectedItem}</Autocomplete>
                  </DropField>
                  <Menu>
                    {matchingOptions.length ? (
                      matchingOptions.map(option => (
                        <Item key={option} value={option}>
                          <span>{option}</span>
                        </Item>
                      ))
                    ) : (
                      <Item disabled>No matches found</Item>
                    )}
                  </Menu>
                </Dropdown>
              </div>

              <div className="child-box small">
                <CustomInput
                  name={"Hours"}
                  setInput={setHours}
                />
              </div>
              <div className="child-box small">
                <CustomInput
                  name={"Minutes"}
                  setInput={setMinutes}
                />
              </div>
            </div>
            <div className="child-box">
              <IconButton>
                <TrashIcon />
              </IconButton>
            </div>
          </div>

          <Row className="box">
            <Button style={{ marginLeft: "10px" }}>Add condition</Button>
          </Row>

          <Row className="box">
            <Col>
              <LG>Actions</LG>
              <div style={{ paddingTop: "10px" }}> </div>
              <Hint>Add actions to create notifications or update the ticket</Hint>
            </Col>
          </Row>
          <div className="parent-box flex-row-action-container box">
            <div className="sub-container flex-row-action-container">
              <div className="action-box">
                <ActionSelector />
              </div>
              <div className="multi-select">
                <MultiSelector/>
              </div>
            </div>
            <div className="child-box">
              <IconButton>
                <TrashIcon />
              </IconButton>
            </div>
          </div>
          <Row className="box">
            <Button style={{ marginLeft: "10px" }}>Add action</Button>
          </Row>

          <Row className="box" alignItems="center" justifyContent="end">
            <Anchor href="#default">Cancel</Anchor>
            <div style={{ padding: "20px" }}></div>
            <Button>Save</Button>
          </Row>
          <div className="divider"></div>
          <Row>
            <ActionTable/>
          </Row>


        </Grid>


      </div>

    </ThemeProvider>
  );
}

export default App;

{/* <div className="heading">
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
// </Col>
// </Row>

// <Row className="box" justifyContent="start">
// <Col sm={5}>
//   <MethodSelector />
// </Col>
// </Row>

// <Row>
// <Col textAlign="start">
//   <Button className="addAlertButton">Add another alert</Button>
// </Col>
// </Row> */}