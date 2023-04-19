import React, { useState } from 'react';
import {
  Dropdown,
  Menu,
  Item,
  Trigger,
  Separator,
  NextItem,
  PreviousItem,
  HeaderItem,
  Field,
  Label,
  Autocomplete
} from '@zendeskgarden/react-dropdowns';
import { Button } from '@zendeskgarden/react-buttons';
import { Row, Col } from '@zendeskgarden/react-grid';
import { ReactComponent as ChevronIcon } from '@zendeskgarden/svg-icons/src/16/chevron-down-stroke.svg';
import { getColor } from '@zendeskgarden/react-theming';
const nestedMenu = (selectedItem: any) => {
  if (selectedItem === 'Ticket') {
    return (
      <>
        <PreviousItem value="tickets">Ticket</PreviousItem>
        <Separator />
        <Item value="Ticket > Add follower">Add follower</Item>
        <Item value="Ticket > Add tags">Add tags</Item>
        <Item value="Ticket > Assignee">Assignee</Item>
        <Item value="Ticket > Form">Form</Item>
        <Item value="Ticket > Group">Group</Item>
        <Item value="Ticket > Priority">Priority</Item>
        <Item value="Ticket > Remove tags">Remove tags</Item>
        <Item value="Ticket > Resolved data">Resolved data</Item>
        <Item value="Ticket > Satisfaction">Satisfaction</Item>
        <Item value="Ticket > Set tags">Set tags</Item>
        <Item value="Ticket > Share ticket">Share ticket with</Item>
        <Item value="Ticket > Status Category">Status Category</Item>
        <Item value="Ticket > Ticket status">Ticket Status</Item>
        <Item value="Ticket > Type">Type</Item>
      </>
    )
  }
  else if (selectedItem === "Notify by") {
    return (<>
      <PreviousItem value="Notify-by">Notify by</PreviousItem>
      <Separator />
      <Item value="Notify by > Email group">Email group</Item>
      <Item value="Notify by > Email user">Email user</Item>
      <Item value="Notify by > In Agent Workspace">In Agent Workspace</Item>
      <Item value="Notify by > Notify Active webhook">Notify Active webhook</Item>
    </>
    )
  }
  else if (selectedItem === "Notify Zendesk integration") {
    return (
      <>
        <PreviousItem value="Notify-Zendesk-integration">Notify Zendesk integration</PreviousItem>
        <Separator />
        <Item value="Notify Zendesk integration > Microsoft Teams">Microsoft Teams</Item>
        <Item value="Notify Zendesk integration > Slack">Slack</Item>
      </>
    )
  } else {
    return (
      <>
        <HeaderItem hasIcon>
          Object
        </HeaderItem>
        <Separator />
        <NextItem value="Ticket">Ticket</NextItem>
        <Separator />
        <HeaderItem hasIcon>
          Organization
        </HeaderItem>
        <Item value="Org Field">Org Field</Item>
        <Separator />
        <HeaderItem hasIcon>
          Other
        </HeaderItem>
        <NextItem value="Notify by">Notify-by</NextItem>
        <NextItem value="Notify Zendesk integration">Notify Zendesk integration</NextItem>
      </>
    )
  }
}
const ActionSelector = () => {
  const [state, setState] = useState({
    isOpen: false,
    tempSelectedItem: "undefined"
  });
  return (
        <Dropdown
          isOpen={state.isOpen}
          onSelect={item => {
            if (item !== 'tickets' && item !== 'Ticket' && item !== 'Notify by' && item !== 'Notify-by' && item !== 'Notify Zendesk integration' && item !== 'Notify-Zendesk-integration') {
              console.log(`You picked a ${item}`);
            }
          }}
          onStateChange={(changes, stateAndHelpers) => {
            const updatedState: any = {};
            

            if (Object.hasOwn(changes, 'isOpen')) {
              updatedState.isOpen =
                changes.selectedItem === 'tickets' ||
                changes.selectedItem === 'Ticket' ||
                changes.selectedItem === 'Notify by' ||
                changes.selectedItem === 'Notify-by' ||
                changes.selectedItem === 'Notify Zendesk integration' ||
                changes.selectedItem === 'Notify-Zendesk-integration' ||
                changes.isOpen;
            }

            if (Object.hasOwn(changes, 'selectedItem')) {
              updatedState.tempSelectedItem = changes.selectedItem;
              stateAndHelpers.setHighlightedIndex(1);
            }

            if (Object.keys(updatedState).length > 0) {
              setState(updatedState);
            }
          }}
        >
          <Field>
            <Label>Action</Label>
            <div style={{ paddingTop: "10px" }}> </div>
          </Field>
          <Trigger>
            <Button style = {{color:"black", borderColor:"#D8DCDE"}}>
              {(state.tempSelectedItem === "undefined" || state.tempSelectedItem === undefined) ? "Notify by > Email user" : state.tempSelectedItem}
              <Button.EndIcon>
                <ChevronIcon />
              </Button.EndIcon>
            </Button>
          </Trigger>
          
          <Menu isAnimated = {false}>
            {nestedMenu(state.tempSelectedItem)}
          </Menu>
        </Dropdown>
  );
};

export default ActionSelector;

