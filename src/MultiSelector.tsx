import React, { useState, useEffect, useRef } from "react";
import {
  Dropdown,
  Multiselect,
  Field,
  Menu,
  Item,
  Label,
  Hint,
  HeaderItem,
} from "@zendeskgarden/react-dropdowns";
import { Tag } from "@zendeskgarden/react-tags";
import debounce from "lodash.debounce";

const options = ["Asignee", "Assignee and followers", "Requester", "Requester and CCs", "Daisy Adair", "George Bailey", "Harry Callahan", "Frank Drebin"];
const ticket = ["Asignee", "Assignee and followers", "Requester", "Requester and CCs"]
const agents = ["Daisy Adair", "George Bailey", "Harry Callahan", "Frank Drebin"]

type MultiSelectorProps = {
  onSelectedItemsChange: (selectedItems: string[]) => void;
};

const MultiSelector = ({ onSelectedItemsChange }: MultiSelectorProps) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [matchingOptions, setMatchingOptions] = useState(options);

  const filterMatchingOptionsRef = useRef(
    debounce((value: string) => {
      const matchedOptions = options.filter((option) => {
        return (
          option.trim().toLowerCase().indexOf(value.trim().toLowerCase()) !== -1
        );
      });

      setMatchingOptions(matchedOptions);
      setIsLoading(false);
    }, 300)
  );

  useEffect(() => {
    setIsLoading(true);
    filterMatchingOptionsRef.current(inputValue);
  }, [inputValue]);

  const split = (matchingOptions: string[]): [string[], string[]] => {
    const tickets: string[] = [];
    const agents: string[] = [];

    matchingOptions.forEach((option) => {
      if (["Asignee", "Assignee and followers", "Requester", "Requester and CCs"].includes(option)) {
        tickets.push(option);
      } else {
        agents.push(option);
      }
    });

    return [tickets, agents];
  };
  const showRender = (matchedOptions: string[]) => {
    const [tickets, agents]: [string[], string[]] = split(matchingOptions);
    return (
      <>
        {tickets.length === 0 ? <></> :
          <HeaderItem>
            Ticket
          </HeaderItem>}
        {tickets.map((option) => (
          <Item key={option} value={option}>
            <span>{option}</span>
          </Item>
        ))}
        {agents.length === 0 ? <></> :
          <HeaderItem>
            Agents
          </HeaderItem>}
        {agents.map((option) => (
          <Item key={option} value={option}>
            <span>{option}</span>
          </Item>
        ))}
      </>
    )
  }

  const renderOptions = () => {
    if (isLoading) {
      return <Item disabled>Loading</Item>;
    }

    if (matchingOptions.length === 0) {
      return <Item disabled>No vegetables found</Item>;
    }

    return showRender(matchingOptions);
  };

  return (
    <Dropdown
      inputValue={inputValue}
      selectedItems={selectedItems}
      onSelect={(items) => {
        setSelectedItems(items);
        onSelectedItemsChange(items);
      }}
      downshiftProps={{ defaultHighlightedIndex: 0 }}
      onInputValueChange={(value) => setInputValue(value)}
    >

      <Field>
        <Multiselect
          maxItems={2}
          renderItem={({ value, removeValue }: any) => (
            <Tag>
              <span>{value}</span>
              <Tag.Close onClick={() => removeValue()} />
            </Tag>
          )}
        />
      </Field>
      <Menu>{renderOptions()}</Menu>
    </Dropdown>
  );
};

export default MultiSelector;
