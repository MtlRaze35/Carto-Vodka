import React, { Component } from "react";
import { render } from 'react-dom';
import { connect } from "react-redux";
import L from 'leaflet';
import styled from 'styled-components';
import carto from '@carto/carto.js';
import { ThemeProvider } from '@carto/airship';

import logo from "./logo.svg";
import "./App.css";
import store from "./store"
import { simpleAction, setMap, setBboxFilter, storeLayers } from "./actions";
import Test from "./components/Test";
import Widgets from "./components/Widgets";
// import layers from "./layers"
import vodka from "./layers/vodka"


const CARTO_BASEMAP =
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png";

// const cartoClient = new carto.Client({
//   apiKey: "14f13a1bee5b93e25bda36f1788f89c57cb7a6e5",
//   username: "anagraph-clement"
// });

class App extends Component {
  
  simpleAction = event => {
    this.props.simpleAction();
  };

  componentDidMount() {
    const map = L.map('map', { zoomControl: false, maxZoom: 18 }).setView([45.712, -72.227], 10)

    L.tileLayer(CARTO_BASEMAP).addTo(map);
    L.control.zoom({ position: 'bottomleft' }).addTo(map);

    this.popup = L.popup({ closeButton: false });

    this.setBbbox(map.getBounds());

    map.on('moveend', event => {
      const boundingBox = event.target.getBounds();
      this.setBbbox(boundingBox);
    });

    // this.setupLayers();
    this.props.setMap(map);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.map && this.props.map) {
      console.log('in')
      this.setupLayers();
     
     
      // console.log('yo')
      // this.props.client.getLeafletLayer().addTo(this.props.map);
    }
  }

  setBbbox(bbox) {
    this.props.setBboxFilter([
      bbox.getSouthWest().lng,
      bbox.getSouthWest().lat,
      bbox.getNorthEast().lng,
      bbox.getNorthEast().lat,
    ]);
  }

  setupLayers() {
    const {client, map} = this.props
    
    const cartoSource = new carto.source.SQL(vodka.query);
    const cartoStyle = new carto.style.CartoCSS(vodka.cartocss);
    
    const vodkaLayer = new carto.layer.Layer(cartoSource, cartoStyle, {
      featureOverColumns: ["marque"]
    });
    // ??****
    console.log('TEST 1')
    console.log('LAYYER??', vodkaLayer)
    console.log('MAP**', this.props.map)
    console.log('STATE:', this.state)
    console.log('TEST 2')
    console.log('CLIENT>>', this.props.client)
    
    client.addLayer(vodkaLayer); 
    
    this.props.storeLayers(vodkaLayer)
    
    console.log('PROPS:', this.props)
    
    //BREAKS HERE
    client.getLeafletLayer().addTo(map);    
  }



//   setupLayers() {
//     const cartoLayers = Object.keys(layers).reduce((all, layerName) => {
//       const { options, ...other} = layers[layerName];

//       const source = new carto.source.SQL(`
//       SELECT
//         *
//       FROM
//         purvodka_master_attempt2_1
//  `);
//       const style = new carto.style.CartoCSS( `
//       #layer {
//         marker-width: 8;
//         marker-fill: #FF583E;
//         marker-fill-opacity: 0.9;
//         marker-line-width: 0.5;
//         marker-line-color: #FFFFFF;
//         marker-line-opacity: 1;
//         marker-type: ellipse;
//         marker-allow-overlap: false;
//       }
//     `);
//       const layer = new carto.layer.Layer(source, style, options);

//       console.log(options)
//       // if(options.featureClickColumns) {
//       //   layer.on('featureClicked', this.openPopup.bind(this));
//       // }

//       this.props.client.getLeafletLayer().addTo(this.props.map);

//       return { ...all, [layerName]: { source, style, layer, ...other } };
//     }, {});

//     // Add all layers at the same tame so it doesn't reload multiple times
//     this.props.client.addLayers(Object.values(cartoLayers).map(item => item.layer));

//     // Labels need to be added after the layers
//     // L.tileLayer(BASEMAP_LABELS).addTo(this.props.map);

//     this.props.storeLayers(cartoLayers)
//   }


  render() {
    const { layers } = this.props;
    const hasLayers = Object.keys(layers).length > 0;

    return (
      <div className="App">
        <div id="map" />
          {hasLayers && (
            <Test/>
          )}
          <button onClick={() => console.log(this.state)}> state test</button>
          <button onClick={() => console.log(this.props)}> props test</button>
        {/* <Widgets/> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  map: state.map,
  client: state.client,
  layers: state.layers,
});

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction()),
  setMap: map => dispatch(setMap(map)),
  setBboxFilter: bbox => dispatch(setBboxFilter(bbox)),
  storeLayers: layers => dispatch(storeLayers(layers)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
