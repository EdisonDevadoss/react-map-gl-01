import React, { Component } from 'react';
import { render } from 'react-dom';
import MapGL, { Source, Layer } from 'react-map-gl';
import ControlPanel from './control-panel';
// import {tempData} from './tempData';
import { dataLayer } from './map-style.js';
import { updatePercentiles } from './utils';
import LegenPanel from './legend-panel';

const MAPBOX_TOKEN = '';


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      year: 2015,
      week: 1,
      month: 1,
      data: null,
      hoveredFeature: null,
      viewport: {
        width: '100vm',
        height: '100vh',
        latitude: 20.5937,
        longitude: 78.9626,
        zoom: 4.3,
        bearing: 0,
        pitch: 0
      }
    };
  }

  componentDidMount() {
    fetch('./data.geojson').then((res) => {
      return res.json();
    }).then((result) => {
      fetch('http://127.0.0.1:5000/v1/units').then((unitRes) => unitRes.json()).then((unitResult) => {
        console.log('unitResult is', unitResult);
        const formatedData = {
          "ANDHRA PRADESH": {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
            12: 0
          }
        }
        unitResult.forEach(obj => {
          if (!formatedData[obj.state_name]) {
            formatedData[obj.state_name] = {
              1: 0,
              2: 0,
              3: 0,
              4: 0,
              5: 0,
              6: 0,
              7: 0,
              8: 0,
              9: 0,
              10: 0,
              11: 0,
              12: 0
            }
          }
          formatedData[obj.state_name][obj.date] = obj.event_count
        })
        const updateFeautes = result.features.map((value) => {
          const updateProperties = {
            ...value.properties,
            units: formatedData[value.properties.name]
          }
          return {
            ...value,
            properties: updateProperties
          }
        });
        const updateUnits = {
          ...result,
          features: updateFeautes
        };
        this._loadData(updateUnits);
      })
    })

  }

  _loadData = data => {
    updatePercentiles(data, f => f.properties.units[this.state.month]);
    this.setState({ data });
  };

  _updateSettings = (name, value) => {
    if (name === 'month') {
      this.setState({ month: value });

      const { data } = this.state;
      if (data) {
        updatePercentiles(data, f => f.properties.units[value]);
        // trigger update
        this.setState({
          data: {
            ...data
          }
        });
      }
    }
  };

  _onViewportChange = viewport => this.setState({ viewport });

  _onHover = event => {
    const {
      features,
      srcEvent: {
        offsetX,
        offsetY
      }
    } = event;
    const hoveredFeature = features && features.find(f => f.layer.id === 'data');

    this.setState({ hoveredFeature, x: offsetX, y: offsetY });
  };

  _renderTooltip() {
    const { hoveredFeature, x, y } = this.state;

    return (
      hoveredFeature && (
        <div className="tooltip" style={{
          left: x,
          top: y
        }}>
          <div>State: {hoveredFeature.properties.name}</div>
          <div>#Events: {hoveredFeature.properties.value}</div>
        </div>
      )
    );
  }

  render() {
    const { viewport, data } = this.state;

    return (
      <div style={{
        height: '100%'
      }}>
        <MapGL {...viewport}
          // mapStyle="mapbox://styles/mapbox/light-v9"
          // mapStyle="mapbox://styles/edisondevadoss/ck4146cws08ew1cp82b04p1gu"
          onViewportChange={this._onViewportChange} mapboxApiAccessToken={MAPBOX_TOKEN} onHover={this._onHover}>
          <Source type="geojson" data={data}>
            <Layer {...dataLayer} />
          </Source>
          {this._renderTooltip()}
        </MapGL>

        <ControlPanel containerComponent={this.props.containerComponent} settings={this.state} onChange={this._updateSettings} />
        <LegenPanel containerComponent={this.props.containerComponent} />
      </div>
    );
  }
}

export function renderToDom(container) {
  render(<App />, container);
}
