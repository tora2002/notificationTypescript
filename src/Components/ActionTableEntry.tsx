import React from 'react';
import { Cell, Row, OverflowButton } from '@zendeskgarden/react-tables';
import { Toggle, Field, Label } from '@zendeskgarden/react-forms';
import { Anchor } from '@zendeskgarden/react-buttons';
import { Dropdown, Trigger, Menu, Item } from '@zendeskgarden/react-dropdowns';
import { Tooltip } from '@zendeskgarden/react-tooltips';
import { Tag } from '@zendeskgarden/react-tags';

interface ActionTableEntryProps {
    index: number;
    title: string;
    description: string;
    activeStatus: string;
    onSelect: Function;
    onShowAddActionScreen: (show: boolean) => void;
    onDelete: Function;
  }
  

function ActionTableEntry({ index, title, description, activeStatus, onSelect, onShowAddActionScreen, onDelete }: ActionTableEntryProps) {
    function onEdit() {
        console.log("in onEdit inside ActionTableEntry")
        const entry = { index, title, description, activeStatus };
        onShowAddActionScreen(true);
        onSelect(entry);
        console.log(entry)
      }
  
    const OverflowMenu = () => (
    <Dropdown>
      <Trigger>
        <TooltipOverflowButton aria-label="Row actions" />
      </Trigger>
      <Menu
        placement="bottom-end"
        popperModifiers={{
          preventOverflow: {
            boundariesElement: 'viewport',
          },
          flip: {
            enabled: false,
          },
          offset: {
            fn: (data) => {
              data.offsets.popper.top -= 2;
              return data;
            },
          },
        }}
      >
        <Item value="item-1" onClick={onEdit}>Edit</Item>
        <Item value="item-2" onClick={() => onDelete(index)}>Delete</Item>
      </Menu>
    </Dropdown>
  );

  const TooltipOverflowButton = React.forwardRef(
    (props: React.ButtonHTMLAttributes<HTMLButtonElement>, ref: React.Ref<HTMLButtonElement>) => (
      <Tooltip content={props['aria-label']} placement="start">
        <OverflowButton ref={ref} {...props} />
      </Tooltip>
    )
  );

  return (
    <Row>
      <Cell>
        <Anchor>{title}</Anchor>
      </Cell>
      <Cell>{description}</Cell>
      <Cell>
        <Tag>
            {activeStatus}
        </Tag>
      </Cell>
      <Cell>
        <OverflowMenu />
      </Cell>
    </Row>
  );
}

export default ActionTableEntry;

