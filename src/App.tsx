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
// import styled from 'styled-components';
import { Alert, Title, Close } from '@zendeskgarden/react-notifications';
import SLACondition from "./Components/SLACondition";
import Action from "./Components/Action";

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

  const [showSLAAlert, setShowSLAAlert] = useState(false);
  const [showActionAlert, setShowActionAlert] = useState(false);

  type SLAConditionType = {
    time: string;
    hours: string;
    minutes: string;
  };

  const [conditions, setConditions] = useState<SLAConditionType[]>([]);

  const addCondition = () => {
    setConditions([
      ...conditions,
      {
        time: selectedItem,
        hours,
        minutes,
      },
    ]);
  };


  type ActionType = {
    actionType: string;
    who: string;
  };

  const [actions, setActions] = useState<ActionType[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);


  const handleSelectItems = (items: string[]) => {
    if (items.length > 0) {
      setAction(items[0]);
    }
    if (items.length > 1) {
      setWho(items[1]);
    }
  };


  const addAction = () => {
    const newAction = {
      actionType: action,
      who,
    };
  
    setActions([...actions, newAction]);
  };  


  const deleteCondition = (conditionToDelete: SLAConditionType) => {
    setConditions(conditions.filter((condition) => condition !== conditionToDelete));
  };

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

          {/* SLA Conditions */}
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
        <Button style={{ marginLeft: "10px" }} onClick={addCondition}>
              Add condition
            </Button>
              {showSLAAlert && (
                <div className="alert">
                  <Alert type="warning">
                    <Title>Warning</Title>
                    At least one SLA condition must be added.
                    <Close aria-label="Close Warning Alert" />
                  </Alert>
                </div>
              )}
            </Row>
        
        {conditions.map((condition, index) => (
          <SLACondition key={index} condition={condition} onDelete={deleteCondition} />
        ))}

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
              {/* <MultiSelector
                onSelectedItemsChange={(items) => {
                  setSelectedItems(items);
                }} */}
                
                <MultiSelector onSelectedItemsChange={handleSelectItems} />
              
              </div>
            </div>
            <div className="child-box">
              <IconButton>
                <TrashIcon />
              </IconButton>
            </div>
          </div>
          <Row className="box">
          <Button onClick={addAction} style={{ marginLeft: "10px" }}>
            Add action
          </Button>
              {showActionAlert && (
                <div className="alert">
                  <Alert type="warning">
                    <Title>Warning</Title>
                    At least one action must be added.
                    <Close aria-label="Close Warning Alert" />
                  </Alert>
                </div>
              )}
            </Row>

            {actions.map((action, index) => (
            <Action key={index} actionType={action.actionType} who={action.who} />
          ))}


          <Row className="box" alignItems="center" justifyContent="end">
            <Anchor href="#default">Cancel</Anchor>
            <div style={{ padding: "20px" }}></div>

            <Button
              onClick={() => {
                if (selectedItem === "" || conditions.length === 0) {
                  setShowSLAAlert(true);
                } else {
                  setShowSLAAlert(false);
                }

                if (action === "" || matchingActions.length === 0) {
                  setShowActionAlert(true);
                } else {
                  setShowActionAlert(false);
                }
              }}
            >
              Save
            </Button>


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