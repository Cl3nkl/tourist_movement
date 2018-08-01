import React, { Component } from 'react';
import { render } from 'react-dom';
import Map from './map.js';
import Toggle from 'react-toggle';

class Navigation extends Component {

  constructor(props){
    super(props);
    this.state={toggleIsReady: true}
    // this.handleBaconChange = this.handleBaconChange.bind(this);
  }
  LAYER(e){
    console.log(e);
    let event = new CustomEvent("LAYER",{
      detail:{
        value: e
        }
      });
    document.body.dispatchEvent(event)
  }
  toggle(){
    this.setState({ toggleIsReady: !this.state.toggleIsReady });
    console.log(this.state.toggleIsReady);
    
  }
  render() {

    if(this.state.toggleIsReady == true){
      return(
       <div className='map-overlay top'>
        <div className='map-overlay-inner'>

            <label className="tglbtnOn">
              
                <Toggle
                  defaultChecked={this.state.toggleIsReady}
                  onClick={this.toggle.bind(this)} />
              
            </label>

            <div> 
            
          <div id='baner'>
            <h2 id='nat' onClick={this.LAYER.bind(this,'default')}>Nationality</h2>
            
            <div><img src='https://lipis.github.io/flag-icon-css/flags/4x3/pl.svg' className="img-fluid" alt="plFlag"/><p id='pl' value='0' onClick={this.LAYER.bind(this,'pl')}>Poland<span id='plNumber'></span></p></div>
            <div><img src="https://lipis.github.io/flag-icon-css/flags/4x3/ru.svg" className="img-fluid" alt="ruFlag"/><p id='ru' value='1' onClick={this.LAYER.bind(this,'ru')}>Russia<span id='ruNumber'></span></p></div>
            <div><img src="https://lipis.github.io/flag-icon-css/flags/4x3/de.svg" className="img-fluid" alt="deFlag"/><p id='de' value='2' onClick={this.LAYER.bind(this,'de')}>Germany<span id='deNumber'></span></p></div>
            <div><img src="https://lipis.github.io/flag-icon-css/flags/4x3/gb.svg" className="img-fluid" alt="enFlag"/><p id='en' value='3' onClick={this.LAYER.bind(this,'en')}>England<span id='enNumber'></span></p></div>
            </div>
              
          </div>  
        </div>
      </div>
      );
    }
    else{
          return (            
            <div className='map-overlay top'>
              <div className='map-overlay-inner'>

                  <label className="tglbtnOff">
                    <Toggle
                      defaultChecked={this.state.toggleIsReady}
                      onClick={this.toggle.bind(this)} />
                  </label>
              </div>
            </div>
          );
    }
  }
}
export default Navigation;