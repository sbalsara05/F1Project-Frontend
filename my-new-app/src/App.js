import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const App = () => {
  const [year, setYear] = useState('');
  const [eventName, setEventName] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [driver1, setDriver1] = useState('');
  const [driver2, setDriver2] = useState('');
  const [telemetryData, setTelemetryData] = useState(null);
  const [error, setError] = useState('');

  const fetchTelemetryData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8080/telemetry', {
        params: { year, event_name: eventName, session_type: sessionType, driver1, driver2 },
      });
      console.log('Received telemetry data:', response.data);
      setTelemetryData(response.data);
    } catch (error) {
      console.error('Error fetching telemetry data:', error);
      setError('Failed to fetch telemetry data. Please check the input fields.');
    }
  };

  const renderChart = (data, label, color, key) => (
    <Line
      key={key}
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

  return (
    <div>
      <h1>F1 Telemetry Comparison</h1>
      <div>
        <label>
          Year:
          <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
        </label>
        <label>
          Event Name:
          <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
        </label>
        <label>
          Session Type:
          <input type="text" value={sessionType} onChange={(e) => setSessionType(e.target.value)} />
        </label>
        <label>
          Driver 1:
          <input type="text" value={driver1} onChange={(e) => setDriver1(e.target.value.toUpperCase())} />
        </label>
        <label>
          Driver 2:
          <input type="text" value={driver2} onChange={(e) => setDriver2(e.target.value.toUpperCase())} />
        </label>
        <button onClick={fetchTelemetryData}>Fetch Telemetry Data</button>
      </div>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {telemetryData && (
        <div>
          <h2>Telemetry Comparison for {year} {eventName}</h2>
          {telemetryData.telemetry_data && telemetryData.telemetry_data[driver1] && telemetryData.telemetry_data[driver2] ? (
            <>
              <div>{renderChart(telemetryData.telemetry_data[driver1], driver1, telemetryData.telemetry_data[driver1].Color, 'driver1')}</div>
              <div>{renderChart(telemetryData.telemetry_data[driver2], driver2, telemetryData.telemetry_data[driver2].Color, 'driver2')}</div>
            </>
          ) : (
            <div>No telemetry data available for one or both drivers.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
