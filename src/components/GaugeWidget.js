import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js';
import { GaugeChart } from '@carto/airship'
import Widget from './Widget';

class GaugeWidget extends Component {
  static propTypes = {
    client: PropTypes.object,
    layers: PropTypes.object,
    map: PropTypes.object,
  }
  state = {
    data: null,
  }

  constructor(props) {
    super(props);
    const { client, map, layers } = props;
    const { source } = layers.vodka;
    
    // const layerSource = props.layers
    console.log('Comp Props?', layers)
    console.log('inside layers?', source._query)
    
    const dataset = new carto.source.SQL(source._query);
    const bboxFilter = new carto.filter.BoundingBoxLeaflet(map);

    console.log("DATA DONE", dataset)
    this.dataView = new carto.dataview.Category(dataset, 'marque')
    this.dataView.addFilter(bboxFilter);
    this.dataView.on('dataChanged', this.onDataChanged);

    client.addDataview(this.dataView);
    // this.setState({incommingSource: layers})
  }

  onDataChanged = (data) => {
    this.setState(data);
    this.dataCounter()
  }

  dataCounter () {
    if (!this.state.count){
      return 0
    } else {
      return this.state.count
    }
  }


  render() {
    const { client, map, layers } = this.props;
    // const {data} = this.state.data
    return(
    <Widget>
      <Widget.Title>Counter</Widget.Title>
      <Widget.Description>counts something to do with booze</Widget.Description>
      <GaugeChart
          maxValue={6500}
          value={this.dataCounter()}
          />

    </Widget>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  layers: state.layers,
});


export default connect(mapStateToProps)(GaugeWidget);

