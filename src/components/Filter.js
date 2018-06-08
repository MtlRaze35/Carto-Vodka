import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js';
import { CategoryWidget } from '@carto/airship'
import Widget from './Widget';

import { setBrands } from '../actions';

class BoozeFilter extends Component {
  static propTypes = {
      client: PropTypes.object,
      layers: PropTypes.object,
      map: PropTypes.object,
  }

  state = {
    categories: [],
    selected: [],
    max: 10
  }

  constructor(props) {
    super(props);

    const { client, layers, map } = props;
    const { source } = layers.vodka;

    // const sql = source.getQuery();
    const bboxFilter = new carto.filter.BoundingBoxLeaflet(map);

    this.dataView = new carto.dataview.Category(new carto.source.SQL(source._query), 'marque', {
      limit: 10,
      operation: carto.operation.COUNT,
      operationColumn: 'cartodb_id'
    });
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

  onCategoryClicked = (selected) => {
    this.setState({ selected });
    this.props.setBrands(selected);
    console.log(this.state)
  }

  render() {
    const { categories, max, selected } = this.state;

    return (
      <Widget>
        <Widget.Title>Different Boozes</Widget.Title>
        <Widget.Description>Amount of Booze around.</Widget.Description>

        <CategoryWidget
          categories={categories}
          max={max}
          // color={this.props.hasCustomTheme ? '#56C58C' : '#3AB5F0'}
          onCategoryClick={this.onCategoryClicked}
          selected={selected}
        />
          <button onClick={()=>console.log('Comp Props?', this.props)}> HELLO </button>
      </Widget>
    );
  }
}

const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  layers: state.layers,
  // hasCustomTheme: !!state.theme,
});

const mapDispatchToProps = dispatch => ({
  setBrands: selected => dispatch(setBrands(selected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoozeFilter);
