import logo from "./logo.svg";
import React, { useRef, useState, useEffect, useCallback } from 'react';
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
import { SM, MD, LG, XL, XXL, XXXL } from '@zendeskgarden/react-typography';
import { ReactComponent as TrashIcon } from '@zendeskgarden/svg-icons/src/16/trash-stroke.svg';
import ActionTable from "./ActionTable";
import { Alert, Title, Close } from '@zendeskgarden/react-notifications';
import SLACondition from "./Components/SLACondition";
import Action from "./Components/Action";

const SLAConditions = [
  "Before breach",
  "After breach",
  "At breach",
];

function App() {
  const [index, setIndex] = React.useState(-1);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [hours, setHours] = React.useState("");
  const [minutes, setMinutes] = React.useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState("Time since breach");
  const [matchingOptions, setMatchingOptions] = useState(SLAConditions);

  const [action, setAction] = useState("");
  const [who, setWho] = useState<string[]>([]);
  const [matchingActions, setMatchingActions] = useState(["Email", "SMS", "Ticket assignment"]);

  const [showSLAAlert, setShowSLAAlert] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showAddActionScreen, setShowAddActionScreen] = useState(true);
  const [showActionAlert, setShowActionAlert] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<EntryType | null>(null);

  type EntryType = {
    index: number;
    title: string;
    description: string;
    activeStatus: boolean;
  }

  const handleSelectEntry = (entry: EntryType) => {
    setSelectedEntry(entry);
    setIndex(entry.index)
    setName(entry.title);
    setDescription(entry.description);
    setIsToggled(entry.activeStatus);
    console.log("Selected entry:", entry);
  };  

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
    who: string[];
  };  

  const [actions, setActions] = useState<ActionType[]>([]);
  const [entries, setEntries] = useState([
    {
      title: "Escalate to account manager",
      description: "Escalate these to the account manager in charge of this",
      activeStatus: "Active"
    },
    {
      title: "Notify assigned agent",
      description: "Notify assigned agent about breach in 2 hours",
      activeStatus: "Inactive"
    }
  ]);


  const handleSelectedWhoItems = (items: string[]) => {
    setWho(items)
  };

  const handleSelectedAction = (item: string) => {
    setAction(item)
  };

  const handleToggleChange = () => {
    setIsToggled(!isToggled);
  };

  const handleShowAddActionScreen = () => {
    setShowAddActionScreen(true);
    setShowTable(false);
  };

  const resetAndShowScreen = () => {
    setSelectedEntry(null);
    setIndex(-1);
    setName("");
    setDescription("");
    setHours("");
    setMinutes("");
    setAction("");
    setWho([]);
    setConditions([]);
    setActions([]);

    handleShowAddActionScreen();
  };

  const addAction = () => {
    const newAction = {
      actionType: action,
      who,
    };

    console.log(newAction);
  
    setActions([...actions, newAction]);
  };  


  const deleteCondition = (conditionToDelete: SLAConditionType) => {
    setConditions(conditions.filter((condition) => condition !== conditionToDelete));
  };

  const deleteAction = (indexToDelete: number) => {
    setActions(actions.filter((_, index) => index !== indexToDelete));
  };

  const deleteTableEntry = (indexToDelete: number) => {
    setEntries(entries.filter((_, index) => index !== indexToDelete));
  };


  const onSave = (name: string, description: string, isToggled: boolean, index: number) => {
    if (index === -1) {
      setEntries([
        ...entries,
        {
          title: name,
          description: description,
          activeStatus: isToggled ? "Active" : "Inactive"
        }
      ]);
    } else {
      setEntries(entries.map((entry, i) => {
        if (i === index) {
          return {
            title: name,
            description: description,
            activeStatus: isToggled ? "Active" : "Inactive"
          };
        }
        return entry;
      }));
    }
    setSelectedEntry(null);
    setShowAddActionScreen(false);
    setShowTable(true);
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

              <div id="add-action-btn">
                <Button style={{ marginLeft: "10px" }} onClick={resetAndShowScreen}>
                      Add action
                </Button>
              </div>
            </Row>


      {showAddActionScreen && (
        <>   
            <div className="divider"></div>
            <Row className="box" >
              <Col sm={7}>
                <CustomInput
                  name={"Action Name"}
                  setInput={setName}
                  value={name}
                />
              </Col>
            </Row>
            <Row className="box">
              <Col sm={10}>
                <Field>
                  <CustomInput
                    name={"Description"}
                    setInput={setDescription}
                    value={description}
                  />
                </Field>
              </Col>
            </Row>
            <Row className="box">
              <Field>
                <Toggle checked={isToggled} onChange={handleToggleChange}>
                  <Label isRegular style={{ marginLeft: "10px" }}>Set as active</Label>
                </Toggle>
              </Field>
            </Row>

            {/* SLA Conditions */}
          
            {showSLAAlert && (
              
              <div className="alert">
                <br></br>
                <Alert type="warning">
                  <Title>Add a condition</Title>
                  Add at least one condition to save a breach action.
                  <Close aria-label="Close Warning Alert" />
                </Alert>
              </div>
            )}
          

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
                  <div className="big">
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

                  <div className="small">
                  <CustomInput
                      name={"Hours"}
                      setInput={setHours}
                      value={hours}
                  />
                  </div>
                  <div className="small">
                  <CustomInput
                      name={"Minutes"}
                      setInput={setMinutes}
                      value={minutes}
                  />
                  </div>
              </div>
              <div>
                  <IconButton>
                  <TrashIcon />
                  </IconButton>
              </div>
           </div>

          <Row className="box">
            <Button style={{ marginLeft: "10px" }} onClick={addCondition}>
                  Add condition
            </Button>
          </Row>

          {conditions.map((condition, index) => (
            <SLACondition key={index} condition={condition} onDelete={deleteCondition} />
          ))}

          
          {/* Actions */}
          {showActionAlert && (
              <div className="alert">
                <Alert type="warning">
                  <Title>Add an action</Title>
                  At least one action to save a breach action.
                  <Close aria-label="Close Warning Alert" />
                </Alert>
              </div>
            )}

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
                  <ActionSelector onChange={handleSelectedAction}/>
                </div>
                <div className="multi-select">                
                  <MultiSelector onSelectedItemsChange={handleSelectedWhoItems} />
                </div>
              </div>
              <div>
                <IconButton>
                  <TrashIcon />
                </IconButton>
              </div>
            </div>
            <Row className="box">
              <Button onClick={addAction} style={{ marginLeft: "10px" }}>
                Add action
              </Button>
            </Row>

              {actions.map((action, index) => (
              <Action key={index} actionType={action.actionType} who={action.who} onDelete={deleteAction} index={index}/>
            ))}

            
            <Row className="box" alignItems="center" justifyContent="end">
              <Anchor href="#default">Cancel</Anchor>
              <div style={{ padding: "20px" }}></div>

              <Button onClick={() => {
                var localShowSLAAlert = false;
                var localShowActionAlert = false;
                console.log(hours === "" || minutes === "" || conditions.length === 0)
                if (hours === "" || minutes === "" || conditions.length === 0) {
                  localShowSLAAlert = true;
                  console.log("hi")
                  setShowSLAAlert(true);
                } else {
                  setShowSLAAlert(false);
                  localShowSLAAlert = false;
                }
              
                console.log((action === "" || matchingActions.length === 0))
                if (action === "" || matchingActions.length === 0) {
                  localShowActionAlert = true;
                  console.log("bye")
                  setShowActionAlert(true);
                } else {
                  localShowActionAlert = false;
                  setShowActionAlert(false);
                }
              
                console.log(showSLAAlert)
                console.log(showActionAlert)
                if (!localShowSLAAlert && !localShowActionAlert) {
                  onSave(name, description, isToggled, index);
                }
              }}
              >
                Save
              </Button>
              </Row>
              </>
        )}
          </Grid>
            
        {showTable && (
          <>
            <Row>
              <div className="divider"></div>
            </Row>
            <Row>
              <ActionTable 
              entries={entries} 
              onSelectEntry={handleSelectEntry}
              onShowAddActionScreen={handleShowAddActionScreen}
              onDelete={deleteTableEntry}/>
            </Row>
          </>
        )}
      </div>
      

    </ThemeProvider>
  );
}

export default App;