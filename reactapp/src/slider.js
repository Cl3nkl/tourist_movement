import React, { Component } from 'react';
import { render } from 'react-dom';
import Map from './map.js';
class Slider extends Component {
  
  constructor(props){
    super(props);
  }
  onInput(){
    let getSliderValue = ()=>{
    
      let input = document.getElementById("slider");
      let currentVal = input.value;
      
      this.setState({value: currentVal})

      let event = new CustomEvent("DAY_VALUE",{
        detail: {
          value: currentVal
        }
        });
      document.body.dispatchEvent(event)
    }
    getSliderValue();
  }
  autoPlay(){

    document.getElementById('slider').style.display='none';
    document.getElementById('Play').style.display='none';
      let getSliderValue = ()=>{
        let event = new CustomEvent("DAY_VALUE",{
          detail: {
            value: x
          }
          });
        document.body.dispatchEvent(event)
      }
    
    let x = 0;
    
    let intervalID = setInterval(function () {
      getSliderValue();   
      document.getElementById('slider').value = 0;
      
      if (++x === 10) {

        window.setTimeout(()=>{
          
          x = 0;
          
          getSliderValue();
          
          document.getElementById('slider').style.display='inline-block';
          document.getElementById('Play').style.display='inline-block';
        },1000);//setTimeout on 1s
          
        window.clearInterval(intervalID);//clear interval
      }
    }, 1000);//setInterval oon 1s
  //<label id='Play' onClick={this.autoPlay.bind(this)}>Play</label>
  }
  render() {
    return (
    <div className='map-overlay2 top'>
		  <div className='map-overlay-inner2'>
          <div className="col">
            <h2>Markers by day</h2>
          </div>
          <div className="col">
            <label id='Play' onClick={this.autoPlay.bind(this)}>Play</label>
            
            <label id='day'></label>
          </div>
          <div className="col">
            <input id="slider" type="range" min="0" max='0' step="1" defaultValue="0" onInput={this.onInput.bind(this)}/>
          </div>
      </div>
    </div>
    );
  }

}

export default Slider;