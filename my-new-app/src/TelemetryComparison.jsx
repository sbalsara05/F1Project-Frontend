import React from 'react';
import { Line } from 'react-chartjs-2';

const TelemetryComparison = ({ telemetryData, year, eventName, driver1, driver2 }) => (
  <div>
    <h2>Telemetry Comparison for {year} {eventName}</h2>
    {telemetryData && telemetryData.telemetry_data && telemetryData.telemetry_data[driver1] && telemetryData.telemetry_data[driver2] ? (
      <>
        <div><ChartComponent data={telemetryData.telemetry_data[driver1]} label={driver1} color={telemetryData.telemetry_data[driver1].Color} /></div>
        <div><ChartComponent data={telemetryData.telemetry_data[driver2]} label={driver2} color={telemetryData.telemetry_data[driver2].Color} /></div>
      </>
    ) : (
      <div>No telemetry data available for one or both drivers.</div>
    )}
  </div>
);

const ChartComponent = ({ data, label, color }) => (
  <Line
    data={{
      labels: data.Distance,
      datasets: [
        {
          label: label,
          data: data.Speed,
          borderColor: color,
          fill: false,
        },
      ],
    }}
    options={{
      responsive: true,
      scales: {
        x: {
          type: 'linear',
          title: {
            display: true,
            text: 'Distance',
          },
        },
        y: {
          type: 'linear',
          title: {
            display: true,
            text: 'Speed',
          },
        },
      },
    }}
  />
);

export default TelemetryComparison;
