import React, { Component } from 'react';
import { render } from 'react-dom';
import mapboxgl from 'mapbox-gl';
import Navigation from "./navigation.js";
import Slider from './slider.js';
import Map from './map.js';
import './style.css';
import './togle.css';

class Application extends Component {
  constructor(props = Props) {
  }
   render() {
      return(
      <div>
        <Navigation/>
        <Slider/>
        <Map/>    
      </div>
      );
     }
}
render(<Application/>,document.getElementById('app'));