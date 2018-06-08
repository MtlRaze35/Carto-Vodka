import React from 'react';
import styled from 'styled-components';
import GaugeWidget from './GaugeWidget';
import CurrentSales from './CurrentSales';

const Widgets = styled.section`
  width: 350px;
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  @media(max-width: 600px){
    width: 100vw;
    max-height: 300px;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
  }
`;

export default () => (
  <Widgets>
    <GaugeWidget/>
    <CurrentSales/>
    {/* HI */}
    {/* <button onClick={()=>console.log('Comp Props?', this.props)}> HELLO </button> */}
  </Widgets>
);
