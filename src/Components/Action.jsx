import React from 'react';
import { IconButton } from '@zendeskgarden/react-buttons';
import { ReactComponent as TrashIcon } from '@zendeskgarden/svg-icons/src/16/trash-stroke.svg';

function Action({ actionType, who }) {
//   const { time, hours, minutes } = condition;
  return (
    <div className="parent-box flex-row-container box">
        <div className="sub-container flex-row-container">
            <div className="child-box big">
                Action Type: {actionType}
            </div>

            <div className="child-box small">
                Who: {who}
            </div>
        </div>
        <div className="child-box">
            <IconButton>
            <TrashIcon />
            </IconButton>
        </div>
    </div>
  );
}

export default Action;
