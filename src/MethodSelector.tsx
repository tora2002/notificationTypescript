import React, { useState, useEffect, useRef } from "react";
import {
  Dropdown,
  Multiselect,
  Field,
  Menu,
  Item,
  Label,
  Hint,
} from "@zendeskgarden/react-dropdowns";
import { Tag } from "@zendeskgarden/react-tags";
import debounce from "lodash.debounce";

const options = ["In app", "Email", "Slack", "Microsoft Teams", "Webhook"];

const MethodSelector = () => {
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

  const renderOptions = () => {
    if (isLoading) {
      return <Item disabled>Loading</Item>;
    }

    if (matchingOptions.length === 0) {
      return <Item disabled>No vegetables found</Item>;
    }

    return matchingOptions.map((option) => (
      <Item key={option} value={option}>
        <span>{option}</span>
      </Item>
    ));
  };

  return (
    <Dropdown
      inputValue={inputValue}
      selectedItems={selectedItems}
      onSelect={(items) => setSelectedItems(items)}
      downshiftProps={{ defaultHighlightedIndex: 0 }}
      onInputValueChange={(value) => setInputValue(value)}
    >
      <Field>
        <Label>Method</Label>
        <Hint>Define the ways in which an agent will recieve this alert</Hint>
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

export default MethodSelector;
