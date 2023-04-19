import React from 'react';
import { ButtonHTMLAttributes } from 'react';
import { Body, Cell, Head, HeaderCell, HeaderRow, OverflowButton, Row, Table } from '@zendeskgarden/react-tables';
import { Toggle, Field, Label } from '@zendeskgarden/react-forms';
import { Anchor } from '@zendeskgarden/react-buttons';
import { Dropdown, Trigger, Menu, Item } from '@zendeskgarden/react-dropdowns';
import { Tooltip } from '@zendeskgarden/react-tooltips';

const TooltipOverflowButton = React.forwardRef(
    (props: ButtonHTMLAttributes<HTMLButtonElement>, ref: React.Ref<HTMLButtonElement>) => (
        <Tooltip content={props['aria-label']} placement="start">
            <OverflowButton ref={ref} {...props} />
        </Tooltip>
    )
);
const OverflowMenu = () => (
    <Dropdown>
        <Trigger>
            <TooltipOverflowButton aria-label="Row actions" />
        </Trigger>
        <Menu
            placement="bottom-end"
            popperModifiers={{
                preventOverflow: {
                    boundariesElement: 'viewport'
                },
                flip: {
                    enabled: false
                },
                offset: {
                    fn: data => {
                        /**
                         * Ensure correct placement relative to trigger
                         **/
                        data.offsets.popper.top -= 2;

                        return data;
                    }
                }
            }}
        >
            <Item value="item-1">Edit</Item>
            <Item value="item-2">Delete</Item>
        </Menu>
    </Dropdown>
);
const ActionTable = () => (
    <div style={{ overflowX: 'auto' }}>
        <Table style={{ minWidth: 500 }}>
            <Head>
                <HeaderRow>
                    <HeaderCell>Action name</HeaderCell>
                    <HeaderCell>Description</HeaderCell>
                    <HeaderCell>Set as active</HeaderCell>
                    <HeaderCell hasOverflow>
                    </HeaderCell>
                </HeaderRow>
            </Head>
            <Body>
                <Row>
                    <Cell><Anchor>Escalate to account manager</Anchor></Cell>
                    <Cell isTruncated>Escalate these to the account manager in charge of this</Cell>
                    <Cell>
                        <div className='checkbox'>
                            <div style={{ marginRight: "20px" }}></div>
                            <Field>
                                <Toggle>
                                    <Label isRegular hidden style={{ marginLeft: "10px" }}>Set as active</Label>
                                </Toggle>
                            </Field>
                        </div>
                    </Cell>
                    <Cell hasOverflow>
                        <OverflowMenu />
                    </Cell>
                </Row>
                <Row>
                    <Cell><Anchor>Notify assigned agent</Anchor></Cell>
                    <Cell isTruncated>Notify assigned agent about breach in 2 hours</Cell>
                    <Cell>
                        <div className='checkbox'>
                            <div style={{ marginRight: "20px" }}></div>
                            <Field>
                                <Toggle>
                                    <Label isRegular hidden style={{ marginLeft: "10px" }}>Set as active</Label>
                                </Toggle>
                            </Field>
                        </div>
                    </Cell>
                    <Cell hasOverflow>
                        <OverflowMenu />
                    </Cell>
                </Row>
            </Body>
        </Table>
    </div>
);

export default ActionTable;
