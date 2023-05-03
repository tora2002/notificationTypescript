import React from 'react';
import { IconButton } from '@zendeskgarden/react-buttons';
import { ReactComponent as TrashIcon } from '@zendeskgarden/svg-icons/src/16/trash-stroke.svg';

function SLACondition({ condition, onDelete }) {
    const { time, hours, minutes } = condition;
  
    return (
        <div className="parent-box flex-row-container box">
        <div className="sub-container flex-row-container">
            <div className="child-box big">
                <b>Time:</b> {time}
            </div>

            <div className="child-box small">
                <b>Hours:</b> {hours}
            </div>
            <div className="child-box small">
                <b>Minutes:</b> {minutes}
            </div>
        </div>
        <div className="child-box">
            <IconButton onClick={() => onDelete(condition)}>
            <TrashIcon />
            </IconButton>
        </div>
    </div>
    );
  }
  

export default SLACondition;
