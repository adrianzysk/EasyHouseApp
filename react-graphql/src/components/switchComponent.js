import React from 'react';
import './switchComponent.css';
const Switch = ({ isItOn, handleToggle, switchid }) => {
  return (
    <>
      <input
        checked={isItOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={switchid}
        type="checkbox"
      />
      <label
        style={{ background: isItOn && '#06D6A0' }}
        className="react-switch-label"
        htmlFor={switchid}
      >
      <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;