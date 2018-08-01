import React, { Component } from 'react';
import { render } from 'react-dom';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZWRkeS1tcCIsImEiOiJjamplMHJ1dGwxOGZsM3dxa3R0aGIycDh0In0.3KFiEEXlv9Pxzp1wOu5vcQ';

class Map extends Component {
  constructor(props) {
    super(props);
    this.stop;
    this.state = {
      lng: 20.0107,
      lat:  50.0551  ,
      zoom: 10,
      data: []
    }; // set state properties for map settings
  }
  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    let layer, sources, stateDay, checkLangLayers, checkDaysLayers, popUp, poly,
        layerPL, layerRU, layerDE, layerEN,
        freshLayer, countryColor,
        randomPoints = [],
        dayNr, countryNr, randomPoints = [], daysString = [], countOfDays, days = [],
        dotsCounts = [], dotsPL, dotsRU, dotsDE, dotsEN, maxOneDayDotsCountry,
        langs = ['pl','ru','de','en'], loader, helpDay, checkSource,
        countryColor = {
            pl: 'red',
            ru: 'orange',
            de: 'blue',
            en: 'green'
        },//define country color
        countryName = {
          'pl':'Poland',
          'ru':'Russia',
          'de':'Germany',
          'en':'England'
        },//define country name
        countryNr = {
          pl: 0,
          ru: 1,
          de: 2,
          en: 3
        };//define country number
    //define variables
    countOfDays = 14; ////////////////////////HERE////////////////set count of days
    //////////////////change stop interval in slider.js/45 
    maxOneDayDotsCountry = 100////////////////////////HERE////////////////set max count of dots per country and day 

    document.getElementById('slider').max = countOfDays-1; 
    this.stop = countOfDays-1;
    console.log(countOfDays+" - days");

    for(let i = 0; i<countOfDays; i++){
      dotsCounts[i] = [100,100,100,100];
      daysString[i] = i+1+'.07.2018';
      days[i] = i;
    }//set randomPoints and add to periodOfTime array || create array holding period of date
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });//create map object

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });//change lng,lat,zoom by moving a map

    checkDaysLayers = () =>{
      if(map.getLayer('default')){
        map.removeLayer('default');
      }
      daysString.forEach(item=>{ 
          if(map.getLayer(item)){
            map.removeLayer(item);
          }
      });
    }//checking if any day layer exist
    checkLangLayers = () =>{
      if(map.getLayer('default')){
        map.removeLayer('default');
      }
      langs.forEach(item=>{
          if(map.getLayer(item)){
                map.removeLayer(item);
          }
      });
    }//checking if any lang layer exist
    checkSource = () =>{
      daysString.forEach(item=>{
          if(map.getSource(item)){
                map.removeSource(item);
          }

      });
    }//checking if any lang layer exist
    sources = (randomPoints,day) =>{
          map.addSource(day, {
          'type' : 'geojson',
          'data' : {
            'type': 'FeatureCollection',
            'features': randomPoints
          }
        });//map.addSource(day)
    }//adding source by randomPoints to each day
    popUp =  (short,long) =>{
      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
      map.on('click', short, function (e) {
          var coordinates = e.features[0].geometry.coordinates.slice();
          var description = "Here's someone from "+ long;
          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
          new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(description)
              .addTo(map);
      });//map.onclick()
      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on('mouseenter', short, function () {
          map.getCanvas().style.cursor = 'pointer';
      });//map.onclick()
      // Change it back to a pointer when it leaves.
      map.on('mouseleave', short, function () {
          map.getCanvas().style.cursor = '';
      });//map.onclick()
    };//popUp function
    
    popUp('pl','Poland');// create popUp above dot
    popUp('ru','Russia');// create popUp above dot
    popUp('de','Germany');// create popUp above dot
    popUp('en','England');// create popUp above dot
    
    this.layer = (day = days[0],short = 'default',color = 'gray')=>{

        if(map.getSource(daysString[day])){
          if(short == 'default'){
            checkLangLayers(); // call to check if any lang layers exists
            checkDaysLayers(); // call to check if any days layers exists
            console.log(day+' day default layer');
            for(let i = 0; i<4; i++){
              if(document.getElementById(langs[i]+'Number')){
                document.getElementById(langs[i]+'Number').innerHTML = '';
              }
            }// clear each HTML count of dots in country buttons 
            map.addLayer({
                  id: 'default',
                  source: daysString[day],
                  type: 'circle',
                  paint:{
                    'circle-color': [
                  'match',
                  ['get', 'nationality'],
                    short, color,
                  /* other */ 'gray'
                  ],
                    'circle-radius' :{
                      property : '8HrPedVol',
                      type : 'exponential',
                      stops: [
                        [0,0],
                        [0,0]
                      ]
                    },
                  }
            });//create a layer for correct country with short like 'pl',color like 'red', day like 'monday' 
            loader = false;
          }
          else{
            checkLangLayers(); // call to check if any lang layers exists
            checkDaysLayers(); // call to check if any days layers exists
            console.log(day+' - '+short+' - '+color);
            for(let i = 0; i<4; i++){
              if(document.getElementById(langs[i]+'Number')){
                document.getElementById(langs[i]+'Number').innerHTML = '';
              }
            }// clear each HTML count of dots in country buttons 

            if(document.getElementById(short+'Number')){
              document.getElementById(short+'Number').innerHTML = '('+dotsCounts[days[day]][countryNr[short]]+')';
            }
            // set HTML count of dots in correct country button

            map.addLayer({
                  id: short,
                  source: daysString[day],
                  type: 'circle',
                  filter: ['==', 'nationality', short],
                  paint:{
                    'circle-color': [
                  'match',
                  ['get', 'nationality'],
                    short, color,
                  /* other */ 'gray'
                  ],
                    'circle-radius' :{
                      property : '8HrPedVol',
                      type : 'exponential',
                      stops: [
                        [0,0],
                        [0,0]
                      ]
                    },
                  }
            });//create a layer for correct country with short like 'pl',color like 'red', day like 'monday' 
            loader = false;
          }
        }
    }//create layer by short,color,day variable 

////////////////functions////////////////////////////////////////////////////////////////////////////////
    //sources(this.tab[0],daysString[0]);    
    map.on('load',()=>{
      
      this.geoJsonData = (day = 0) =>{

        if(loader == true){

        }
        else{
          loader = true;
          helpDay = day;
          fetch(`http://localhost:3000/api/geojsons/geojson/${helpDay}`)
          .then((response) => response.json())
          .then((findresponse) => {
              this.setState({data:findresponse});
              checkDaysLayers();
              checkLangLayers();
              checkSource();
              if(findresponse){
                if(map.getSource(daysString[helpDay])){
                  if(this.langShort){
                    this.layer(helpDay,this.langShort,this.langColor);  
                    document.getElementById('slider').value = helpDay;
                    document.getElementById('day').innerHTML = daysString[helpDay];
                    //loader = false;
                    this.day = helpDay;
                  }
                  else{
                    this.layer(helpDay);
                    document.getElementById('slider').value = helpDay;
                    document.getElementById('day').innerHTML = daysString[helpDay];
                    //loader = false;
                    this.day = helpDay;
                  }
                }
                else{
                  sources(findresponse,daysString[helpDay]);
                  if(this.langShort){
                    this.layer(helpDay,this.langShort,this.langColor);  
                    document.getElementById('slider').value = helpDay;
                    document.getElementById('day').innerHTML = daysString[helpDay];
                    //loader = false;
                    this.day = helpDay;
                  }
                  else{
                    this.layer(helpDay);
                    document.getElementById('slider').value = helpDay;
                    document.getElementById('day').innerHTML = daysString[helpDay];
                    //loader = false;
                    this.day = helpDay;
                  }
                }
              }
              else{
                console.log('nie ma responsa');
              }  
          });
        }
      };// geoJsonData() -- get data from API 
      this.geoJsonData();

      document.getElementById('day').innerHTML = daysString[0];
    });

    document.body.addEventListener('DAY_VALUE',(e)=>{ 
      if(this.langShort){
        this.day = e.detail.value;


        this.geoJsonData(this.day);
        

        document.getElementById('day').innerHTML = daysString[this.day];
      }
      else{
        this.day = e.detail.value;
        

        this.geoJsonData(this.day);

        

        document.getElementById('day').innerHTML = daysString[this.day];
      }
    });

    document.body.addEventListener("LAYER",(e)=>{
      if(e.detail.value == 'default'){
        document.getElementById('slider').value = 0;
        document.getElementById('day').innerHTML = daysString[0];
        this.langShort = 0;
        this.langColor = 0;
        this.day = 0;
        this.geoJsonData(this.day);
      }
      else{

        this.langShort = e.detail.value;
        this.langColor = countryColor[e.detail.value];
        this.geoJsonData(this.day);
      }
    });
    
  }//didComponentMount()
  render() {
    
    const { lng, lat, zoom } = this.state;
    if(!this.state.data){
      return '';
    }
    else{     
      return (
        <div>
          <div id='map'>
            <div className='inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold'>
              <div id="lnglatbar">{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
            </div>
            <div ref={el => this.mapContainer = el} className='absolute top right left bottom' />
          </div>
        </div>
      );
    }
  }//render() || display map
}
export default Map;
