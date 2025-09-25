import React, { useState } from "react";
import "./AddWidgetDialog.css";

const widgetOptions = {
  CSPM: [
    { key: "cloudAccounts", label: "Cloud Accounts" },
    { key: "cloudRisk", label: "Cloud Account Risk Assessment" },
  ],
  CWPP: [
    { key: "namespaceAlerts", label: "Namespace Specific Alerts" },
    { key: "workloadAlerts", label: "Workload Alerts" },
  ],
  Image: [
    { key: "imageRisk", label: "Image Risk Assessment" },
    { key: "imageSecurity", label: "Image Security Issues" },
  ],
  Ticket: [
    { key: "openTickets", label: "Open Tickets" },
    { key: "closedTickets", label: "Closed Tickets" },
  ],
};

export default function AddWidgetDialog({ open, onClose, onConfirm }) {
  const [activeTab, setActiveTab] = useState("CSPM");
  const [selected, setSelected] = useState({ CSPM: [], CWPP: [], Image: [], Ticket: [] });

  function handleToggle(option) {
    setSelected(prev => {
      const list = prev[activeTab];
      const exists = list.includes(option.key);
      const newList = exists ? list.filter(k => k !== option.key) : [...list, option.key];
      return { ...prev, [activeTab]: newList };
    });
  }

  function handleConfirm() {
    onConfirm(selected);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="widget-dialog-backdrop">
      <div className="widget-dialog">
        <div className="widget-dialog-header">
          <span>Add Widget</span>
          <button className="widget-dialog-close" onClick={onClose}>×</button>
           
        </div>
        <p className="addwidget-text">Personalize your dashboard by adding following widget</p>
        <div className="widget-dialog-tabs">
          {Object.keys(widgetOptions).map(tab => (
            <div
              key={tab}
              className={activeTab === tab ? "tab active" : "tab"}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className="widget-dialog-list">
          {widgetOptions[activeTab].map(option => (
            <label key={option.key} className="widget-option">
              <input
                type="checkbox"
                checked={selected[activeTab].includes(option.key)}
                onChange={() => handleToggle(option)}
              />
              {option.label}
            </label>
          ))}
        </div>
        <div className="widget-dialog-footer">
          <button className="widget-btn cancel" onClick={onClose}>Cancel</button>
          <button className="widget-btn confirm" onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
