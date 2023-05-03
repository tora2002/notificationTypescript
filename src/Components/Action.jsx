import React from 'react';
import { IconButton } from '@zendeskgarden/react-buttons';
import { ReactComponent as TrashIcon } from '@zendeskgarden/svg-icons/src/16/trash-stroke.svg';

function Action({ actionType, who, onDelete, index }) {
  
  return (
    <div className="parent-box flex-row-container box">
        <div className="sub-container flex-row-container">
            <div className="child-box medium">
                <b>Action Type:</b> 
                <br></br>
                {actionType}
            </div>

            <div className="child-box medium">
                <b>Who:</b> 
                <br></br> 
                {who.join(', ')}
            </div>
        </div>
        <div className="child-box">
            <IconButton onClick={() => onDelete(index)}>
            <TrashIcon />
            </IconButton>
        </div>
    </div>
  );
}

export default Action;
