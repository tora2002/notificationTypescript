import React from 'react';
import { Body, Head, HeaderCell, HeaderRow, OverflowButton, Table } from '@zendeskgarden/react-tables';
import ActionTableEntry from './Components/ActionTableEntry';

type EntryType = {
    title: string;
    description: string;
    activeStatus: string;
  };

interface ActionTableProps {
    entries: EntryType[];
    onSelectEntry: Function;
    onShowAddActionScreen: (show: boolean) => void;
    onDelete: Function;
  }  

const ActionTable = ( { entries, onSelectEntry, onShowAddActionScreen, onDelete }: ActionTableProps) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <Table style={{ minWidth: 500 }}>
        <Head>
          <HeaderRow>
            <HeaderCell>Action name</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Set as active</HeaderCell>
            <HeaderCell hasOverflow />
          </HeaderRow>
        </Head>
        <Body>
          {entries.map((entry, index) => (
            <ActionTableEntry
                key={index}
                index={index}
                title={entry.title}
                description={entry.description}
                activeStatus={entry.activeStatus}
                onSelect={onSelectEntry}
                onShowAddActionScreen={onShowAddActionScreen}
                onDelete={onDelete}
          />
          ))}
        </Body>
      </Table>
    </div>
  );
};

export default ActionTable;
