import React from 'react';
import WidgetCard from './WidgetCard';

const data = {
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
    },
    {
      title: "",
      type: "empty",
    },
  ],
  "CWPP Dashboard": [
    {
      title: "Top 5 Namespace Specific Alerts",
      type: "emptyMessage",
      message: "No Graph data available!",
    },
    {
      title: "Workload Alerts",
      type: "emptyMessage",
      message: "No Graph data available!",
    },
    {
      title: "",
      type: "empty",
    },
  ],
  "Registry Scan": [
    {
      title: "Image Risk Assessment",
      type: "bar",
      total: 1470,
      bars: [
        { label: "Critical", value: 9, color: "#ae1212" },
        { label: "High", value: 150, color: "#ca7800" },
        { label: "Medium", value: 5, color: "#e6ba0f" },
        { label: "Low", value: 100, color: "#cccccc" },
      ],
    },
    {
      title: "Image Security Issues",
      type: "bar",
      total: 2,
      bars: [
        { label: "Critical", value: 2, color: "#ae1212" },
        { label: "High", value: 2, color: "#ca7800" },
        { label: "Medium", value: 0, color: "#e6ba0f" },
        { label: "Low", value: 0, color: "#cccccc" },
      ],
    },
    {
      title: "",
      type: "empty",
    },
  ],
};

const Dashboard = () => (
  <div className="dashboard">
    {Object.keys(data).map(section => (
      <div key={section} className="section">
        <h2 className="section-title">{section}</h2>
        <div className="cards">
          {data[section].map((widget, i) => (
            <WidgetCard key={i} {...widget} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default Dashboard;
