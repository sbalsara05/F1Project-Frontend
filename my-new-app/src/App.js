import React, { useState } from 'react';
import axios from 'axios';
import InputField from './TextInput';
import ErrorMessage from './ErrorMessage';
import TelemetryComparison from './TelemetryComparison';

const App = () => {
  const [year, setYear] = useState('');
  const [eventName, setEventName] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [driver1, setDriver1] = useState('');
  const [driver2, setDriver2] = useState('');
  const [telemetryData, setTelemetryData] = useState("");
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

  return (
    <div>
      <h1>F1 Telemetry Comparison</h1>
      <div>
        <InputField label="Year:" value={year} onChange={(e) => setYear(e.target.value)} />
        <InputField label="Event Name:" value={eventName} onChange={(e) => setEventName(e.target.value)} />
        <InputField label="Session Type:" value={sessionType} onChange={(e) => setSessionType(e.target.value)} />
        <InputField label="Driver 1:" value={driver1} onChange={(e) => setDriver1(e.target.value.toUpperCase())} />
        <InputField label="Driver 2:" value={driver2} onChange={(e) => setDriver2(e.target.value.toUpperCase())} />
        <button onClick={fetchTelemetryData}>Fetch Telemetry Data</button>
      </div>

      <ErrorMessage error={error} />

      <TelemetryComparison telemetryData={telemetryData} year={year} eventName={eventName} driver1={driver1} driver2={driver2} />
    </div>
  );
};

export default App;
