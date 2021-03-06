import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ReactMapGL, {Source, Layer} from 'react-map-gl';

const mapbox_api = '';

function App() {
  const [viewport, setViewport] = useState({
    width: '100vm',
    height: '100vh',
    latitude: 20.5937,
    longitude: 78.9626,
    zoom: 4.3
  })
  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={mapbox_api}
      mapStyle="mapbox://styles/edisondevadoss/ck4146cws08ew1cp82b04p1gu"
      onViewportChange={viewport=>{
        setViewport(viewport);
      }}
    />
  );
}

export default App;
