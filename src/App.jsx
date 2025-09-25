import React, { useState } from 'react';
import Dashboard from "./components/Dashboard";
import AddWidgetDialog from "./components/AddWidgetDialog";
import Toolbar from './components/Toolbar';
import './App.css';

const defaultData = {
  "CSPM Executive Dashboard": [
    {
      title: "Cloud Accounts",
      type: "donut",
      total: 2,
      details: [
        { label: "Connected", value: 2, color: "#497ce3" },
        { label: "Not Connected", value: 2, color: "#d7e0fc" },
      ],
    },
    {
      title: "Cloud Account Risk Assessment",
      type: "donut",
      total: 9659,
      details: [
        { label: "Failed", value: 1689, color: "#ae1212" },
        { label: "Warning", value: 681, color: "#e6ba0f" },
        { label: "Not available", value: 36, color: "#0f0e27" },
        { label: "Passed", value: 7253, color: "#1a9e27" },
      ],
    }
  ],
  "CWPP Dashboard": [],
  "Registry Scan": []
};

function App() {
  const [widgets, setWidgets] = useState(defaultData);
  const [showDialog, setShowDialog] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  function handleAddWidget(section, widget) {
    setWidgets(prev => ({
      ...prev,
      [section]: [...prev[section], widget]
    }));
  }

  function handleRemoveWidget(section, index) {
    setWidgets(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  }

  return (
    <div className="app">
      <Header onAddWidget={() => setShowDialog(true)} />
      <Dashboard 
  widgets={widgets} 
  onRemoveWidget={handleRemoveWidget} 
  onEmptyAdd={(section) => { setActiveSection(section); setShowDialog(true); }}
/>
      {showDialog &&
        <AddWidgetDialog
          open={showDialog}
          onClose={() => setShowDialog(false)}
          onConfirm={({ section, name, text }) => {
            if (section && name && text) {
              handleAddWidget(section, {
                title: name,
                type: "custom",
                text
              });
            }
            setShowDialog(false);
          }}
          section={activeSection}
        />
      }
    </div>
  );
}

const Header = ({ onAddWidget }) => (
  <header className="header">
    <div className="breadcrumb">Home &gt; Dashboard V2
      <input type="search" placeholder="Search anything..." className="search-input" />
    </div>
    <div className="header-right">
      <h3>CNAPP Dashboard</h3>
      <div className='dashboard-right'>
        <button className="btn" onClick={onAddWidget}>Add Widget +</button>
        <Toolbar />
      </div>
    </div>
  </header>
);

export default App;
