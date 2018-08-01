import React, { Component } from 'react';
import { render } from 'react-dom';
import turf from 'turf';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class Polygon 
{
  constructor()
  {
    this.nw, this.se, this.ne, this.sw, this.bounds, this.lat, this.lng, this.zoom;

    this.sw = new mapboxgl.LngLat(19.829665,49.994566); 
    this.ne = new mapboxgl.LngLat(20.183085,50.116211);
    // set left bottom and right top corner for create a box
  }
  
  generateRandomLngLat() {
    let setRandomLngLat, randomPoint;
    
    setRandomLngLat = () => {
      let rlng, rlat, rPoint = [];

      this.bounds = new mapboxgl.LngLatBounds(this.sw,this.ne);

      this.sw = this.bounds.getSouthWest(); // gets left bottom corner
      this.nw = this.bounds.getNorthWest(); // gets left top corner
      this.se = this.bounds.getSouthEast(); // gets right bottom corner
      this.ne = this.bounds.getNorthEast(); // gets right top corner
      
      this.sw = [this.sw.lng,this.sw.lat]; // set lng,lat left bottom corner
      this.nw = [this.nw.lng,this.nw.lat]; // set lng,lat left top corner
      this.se = [this.se.lng,this.se.lat]; // set lng,lat right bottom corner
      this.ne = [this.ne.lng,this.ne.lat]; // set lng,lat right top corner
      
      rlng = this.sw[0] + (Math.random() * (this.ne[0] - this.sw[0])); // create random longitude 
      rlat = this.se[1] + (Math.random() * (this.nw[1] - this.se[1])); // create random latitude

      rPoint = [rlng,rlat];
      return rPoint; // return random point[longitude,latitude]
    };//setRandomLngLat function 

    randomPoint = setRandomLngLat();

    return randomPoint; // return random point [longitude,latitude]
  }//generateRandomLngLat method 

  generate(dotsPL = 10, dotsRU = 10, dotsDE = 10, dotsEN = 10){
    // gets count of dots for each country

    let dots = [dotsPL, dotsRU, dotsDE, dotsEN],
        count = dotsPL+ dotsRU+ dotsDE+ dotsEN;
    
      let i ,randomPoints = [];
      
      for(let i = 0; i<count;i++)
      {
        randomPoints.push(this.generateRandomLngLat());
      }// push random points to array randomPoints[]
    
      return this.generateGeoJSON(randomPoints,dotsPL, dotsRU, dotsDE, dotsEN); // return method with geoJSON array
  }
         
  
  generateGeoJSON(randomPoints,dotsPL, dotsRU, dotsDE, dotsEN){

    let counter = 0, createGeoJSON;
    
    createGeoJSON = (randomPoints, dotsPL, dotsRU, dotsDE, dotsEN) =>{
      
      let geoJSONTab = [], nationalities, countryCount;

      nationalities = ['pl','ru','de','en'];//define short countrys
      countryCount = [dotsPL, dotsRU, dotsDE, dotsEN];//count of dots for each country 
      
      for(let i = 0; i<4;i++){
        
        for(let j = 0; j<countryCount[i];j++)
        {
          geoJSONTab.push({
                  "type": "Feature",
                  "properties": {
                    "nr": counter,
                    "nationality": nationalities[i]
                  },
                  "geometry": {
                    "type": "Point",
                    "coordinates": [
                      randomPoints[counter][0],randomPoints[counter][1]
                    ]
                  }
                });//add geoJSON to array geoJSONTab[]
          counter++; //as many as randomPoints
        }
      };
      return geoJSONTab;//return array to generate() method
    };
    return createGeoJSON(randomPoints, dotsPL, dotsRU, dotsDE, dotsEN); // call to createGeoJSON() for create geoJSON
  }//generateGeoJSON
}//createpolygon class

  export default  Polygon; // export Polygon class