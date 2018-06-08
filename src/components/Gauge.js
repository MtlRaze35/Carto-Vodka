import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js';
import { GaugeChart } from '@carto/airship'
import Widget from './Widget';

class Gauge extends Component {
  static propTypes = {
    client: PropTypes.object,
    layers: PropTypes.object,
    map: PropTypes.object,
  }

  state = {
    categories: [],
  }

  constructor(props) {
    super(props);

    const { client, layers, map } = props;
    const { source } = layers.vodkaLayer;

    const bboxFilter = new carto.filter.BoundingBoxLeaflet(map);

    this.dataView = new carto.dataview.Category(source, 'marque');
    this.dataView.addFilter(bboxFilter);
    this.dataView.on('dataChanged', this.onDataChanged);

    client.addDataview(this.dataView);
  }

  componentWillUnmount() {
    this.dataView.off('dataChanged');
  }

  onDataChanged = (data) => {
    this.setState(data);
  }

  render() {
    const { categories } = this.state;

    return (
      <Widget>
        <Widget.Title>Gauge</Widget.Title>
        <Widget.Description>Gauge representation of Data</Widget.Description>

        {categories.length > 0 && (
          <GaugeChart
          maxValue={6500}
          value={'5'}
          />
        )}
      </Widget>
    );
  }
}

const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  layers: state.layers,
});

export default connect(mapStateToProps)(Gauge);