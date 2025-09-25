import React from 'react';

const DonutChart = ({ details, total }) => {
  const totalValue = details.reduce((a, d) => a + d.value, 0);
  let cumulativePercent = 0;


  function getOffset(value) {
    const percent = value / totalValue;
    const offset = cumulativePercent;
    cumulativePercent += percent;
    return offset;
  }


  return (
    <svg width="150" height="140" viewBox="0 0 42 42" className="donut">
      <circle className="donut-hole" cx="21" cy="21" r="15.9155" fill="#fff" />
      <circle
        className="donut-ring"
        cx="21"
        cy="21"
        r="15.9155"
        fill="transparent"
        stroke="#d2d3d4"
        strokeWidth="3"
      />
      {details.map((segment, i) => {
        const percent = segment.value / totalValue;
        const strokeDasharray = `${percent * 100} ${100 - percent * 100}`;
        const strokeDashoffset = 100 * (1 - getOffset(segment.value));
        return (
          <circle
            key={i}
            className="donut-segment"
            cx="21"
            cy="21"
            r="15.9155"
            fill="transparent"
            stroke={segment.color}
            strokeWidth="3"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
          />
        );
      })}
      <text x="50%" y="50%" className="donut-text" textAnchor="middle" dy="0.3em">
        {total}

      </text>

    </svg>
  );
};


const BarChart = ({ bars, total }) => (
  <div className="bar-chart">
    <div className="bar-chart-title">{total} Total Vulnerabilities</div>
    <div className="bars">
      {bars.map((bar, i) => (
        <div
          key={i}
          className="bar-segment"
          style={{ width: `${(bar.value / total) * 100}%` }}
        >
          <div className="bar-fill" style={{ backgroundColor: bar.color }} />
          <span className="bar-label">{bar.label} ({bar.value})</span>
        </div>
      ))}
    </div>
  </div>
);


const ColorLegend = ({ items }) => (
  <div className="color-legend">
    {items.map(({ color, label }, index) => (
      <div key={index} className="legend-item">
        <span className="color-box" style={{ backgroundColor: color }}></span>
        <span>{label}</span>
      </div>
    ))}
  </div>
);


const WidgetCard = ({ type, title, total, details, bars, message }) => {
  return (
    <div className="card">
      {title && <div className="card-title">{title}</div>}
      {type === 'donut' && (
        < div className='donut-card'>
          <DonutChart total={total} details={details} />
          {title === "Cloud Accounts" && (
            <ColorLegend
              items={[
                { color: "#497ce3", label: "Connected (2)" },
                { color: "#d7e0fc", label: "Not Connected (2)" },
              ]}
            />
          )}
          {title === "Cloud Account Risk Assessment" && (
            <ColorLegend
              items={[
                { color: "#ae1212", label: "Failed (1689)" },
                { color: "#e6ba0f", label: "Warning (681)" },
                { color: "#b4b4b8ff", label: "Not available (36)" },
                { color: "#1a9e27", label: "Passed (7253)" },
              ]}
            />
          )}
        </div>
      )}
      {type === 'emptyMessage' && <div className="empty-message">{message}</div>}
      {type === 'bar' && <BarChart bars={bars} total={total}
      />}
      {type === 'empty' && <div className="empty-slot"
      ><button className='btn-widget'>+ Add Widget</button></div>}
    </div>
  );
};


export default WidgetCard;
