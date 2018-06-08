import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js';
import { Display } from '@carto/airship'
import Widget from './Widget';



class CurrentSales extends Component {
  static propTypes = {
      client: PropTypes.object,
      layers: PropTypes.object,
      map: PropTypes.object,
  }

  state = {
    result: 0,
  }

  constructor(props) {
    super(props);

    const { client, layers, map } = props;
    const { source } = layers.vodka;

    const sql = source.getQuery();
    const bboxFilter = new carto.filter.BoundingBoxLeaflet(map);

    this.dataView = new carto.dataview.Formula(new carto.source.SQL(source._query), 'montant_periode_en_cours', {
      operation: carto.operation.SUM,
    });
    this.dataView.addFilter(bboxFilter);
    this.dataView.on('dataChanged', this.onDataChanged);

    client.addDataview(this.dataView);
  }

  onDataChanged = (data) => {
    this.setState(data);
  }


  render() {
    const { result } = this.state;

    return (
      <Widget>
        <Widget.Title>Vol. des ventes 12 derniers mois</Widget.Title>
        <Widget.Description>Test</Widget.Description>
          <Display>{ result }$</Display>
      </Widget>
    );
  }
}

const mapStateToProps = state => ({
  result: state.result,
  client: state.client,
  map: state.map,
  layers: state.layers,
});

export default connect(mapStateToProps)(CurrentSales);
