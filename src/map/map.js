import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {Source, Layer} from 'react-map-gl';
import ControlPanel from './control-panel';
// import {tempData} from './tempData';
import {indianGeoCode} from './indianGeoCode';
import {dataLayer} from './map-style.js';
import {updatePercentiles} from './utils';
import {json as requestJson} from 'd3-request';
import LegenPanel from './legend-panel';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZWRpc29uZGV2YWRvc3MiLCJhIjoiY2s0MTNweHlhMDdwZDNwcG95cmJraGl6dyJ9.aUK57pw316_tz92_mwsagA';


// latitude: 20.5937,
// longitude: 78.9626,
export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      year: 2015,
      week: 0,
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
    fetch('./data.json').then((res)=>{
      return res.json();
    }).then((result)=>{
      console.log('result is', result);
      this._loadData(result);
    })

  }

  _loadData = data => {
    updatePercentiles(data, f => f.properties.uints[this.state.week]);
    this.setState({data});
  };

  _updateSettings = (name, value) => {
    if (name === 'week') {
      this.setState({week: value});

      const {data} = this.state;
      if (data) {
        updatePercentiles(data, f => f.properties.uints[value]);
        // trigger update
        this.setState({data: {...data}});
      }
    }
  };

  _onViewportChange = viewport => this.setState({viewport});

  _onHover = event => {
    const {
      features,
      srcEvent: {offsetX, offsetY}
    } = event;
    const hoveredFeature = features && features.find(f => f.layer.id === 'data');

    this.setState({hoveredFeature, x: offsetX, y: offsetY});
  };

  _renderTooltip() {
    const {hoveredFeature, x, y} = this.state;

    return (
      hoveredFeature && (
        <div className="tooltip" style={{left: x, top: y}}>
          <div>State: {hoveredFeature.properties.name}</div>
          <div>Strength: {hoveredFeature.properties.value}</div>
          <div>Percentile: {(hoveredFeature.properties.percentile / 8) * 100}</div>
        </div>
      )
    );
  }

  render() {
    const {viewport, data} = this.state;

    return (
      <div style={{height: '100%'}}>
        <MapGL
          {...viewport}
          // mapStyle="mapbox://styles/mapbox/light-v9"
          onViewportChange={this._onViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onHover={this._onHover}
        >
          <Source type="geojson" data={data}>
            <Layer {...dataLayer} />
          </Source>
          {this._renderTooltip()}
        </MapGL>

        <ControlPanel
          containerComponent={this.props.containerComponent}
          settings={this.state}
          onChange={this._updateSettings}
        />
      <LegenPanel containerComponent={this.props.containerComponent} />
      </div>
    );
  }
}

export function renderToDom(container) {
  render(<App />, container);
}
