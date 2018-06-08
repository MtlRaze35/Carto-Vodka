import React from 'react';
import styled from 'styled-components';
import Gauge from './Gauge';

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
    <Gauge/>
  </Widgets>
);
