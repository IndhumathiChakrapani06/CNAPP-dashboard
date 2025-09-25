import React, { useState } from 'react';
import'./Toolbar.css'

const Toolbar = ({ onRefresh, onTimeFrameChange }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [timeFrame, setTimeFrame] = useState("Last 2 days");

  function handleMoreOptionSelection(option) {
   
    alert(`Selected menu option: ${option}`);
    setShowMenu(false);
  }

  function handleTimeFrameChange() {
   
    const options = ["Last 2 days", "Last week", "Last month"];
    const nextIndex = (options.indexOf(timeFrame) + 1) % options.length;
    const next = options[nextIndex];
    setTimeFrame(next);
    if (onTimeFrameChange) onTimeFrameChange(next);
  }

  return (
    <div className="toolbar-container">
      <button
        className="icon-btn refresh"
        title="Refresh"
        onClick={() => {
          if (onRefresh) onRefresh();
          else alert("Refresh clicked");
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="1 4 1 10 7 10" />
          <polyline points="23 20 23 14 17 14" />
          <path d="M20.49 9a9 9 0 1 0-1.07 5.23" />
        </svg>
      </button>

      <button
        className="icon-btn more"
        title="More options"
        onClick={() => setShowMenu(!showMenu)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>

      {showMenu && (
        <div className="more-menu">
          <ul>
            <li onClick={() => handleMoreOptionSelection("Option 1")}>Settings</li>
            <li onClick={() => handleMoreOptionSelection("Option 2")}>Log Out</li>
          </ul>
        </div>
      )}

      <button className="time-frame" onClick={handleTimeFrameChange}>
        <svg width="16" className='clock' height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <div>
          {timeFrame}
        </div>
        
      </button>
    </div>
  );
};

export default Toolbar;
