module.exports = function(Geojson) {
  
    Geojson.generateRandomLngLat = () => {
        let setRandomLngLat, randomPoint;
        setRandomLngLat = () => {
          let rlng, rlat, rPoint = [];

          rlng = 19.829665 + (Math.random() * (20.183085 - 19.829665)); // create random longitude 
          rlat = 49.994566 + (Math.random() * (50.116211 - 49.994566)); // create random latitude
    
          rPoint = [rlng,rlat];
          
          return rPoint; // return random point[longitude,latitude]
        };//setRandomLngLat function 
    
        randomPoint = setRandomLngLat();
        return randomPoint; // return random point [longitude,latitude]
    }//generateRandomLngLat method 
    
    Geojson.generate = (dotsPL = 100, dotsRU = 100, dotsDE = 100, dotsEN = 100, day) =>{
        // gets count of dots for each country
        
        let dots = [dotsPL, dotsRU, dotsDE, dotsEN],
            count;

          count = dots[0] + dots[1] + dots[2] + dots[3];

          let i ,randomPoints = [];
          
          for(i = 0; i<count;i++)
          {
            randomPoints.push(Geojson.generateRandomLngLat());
          }// push random points to array randomPoints[]
        
        return Geojson.generateGeoJSON(randomPoints,dotsPL, dotsRU, dotsDE, dotsEN, day); // return method with geoJSON array
    }
             
    Geojson.generateGeoJSON = (randomPoints,dotsPL, dotsRU, dotsDE, dotsEN, day) =>{
    
        let counter = 0, createGeoJSON;

        createGeoJSON = (randomPoints, dotsPL, dotsRU, dotsDE, dotsEN, day) =>{
          
          let geoJSONTab = [], nationalities, countryCount;
    
          nationalities = ['pl','ru','de','en'];//define short countrys
          countryCount = [dotsPL, dotsRU, dotsDE, dotsEN];//count of dots for each country 
          
          for(let i = 0; i<4;i++){
            
            for(let j = 0; j<countryCount[i];j++)
            {
              geoJSONTab.push({
                      "type": "Feature",
                      "properties": {
                        "day": day,
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
        return createGeoJSON(randomPoints, dotsPL, dotsRU, dotsDE, dotsEN, day); // call to createGeoJSON() for create geoJSON
    }
    //generateGeoJSON
    Geojson.date = () =>{
      let tab = [];
      
      let counts = 100; /// set a count of dots
      for(let i = 0; i<14;i++){
        tab[i] = Geojson.generate(counts,counts,counts,counts,i);
      }
      return tab;///return a tab with random points
    };///////////////////here you set count of dots and count of days in database
    
    Geojson.addSourdeToDB = (req, cb)=>{
      console.log(Geojson.date());
      Geojson.destroyAll({}).then(()=>{

      }).catch(err=>{
        console.log(err);
        return cb(null,{status:false});
      })
      Geojson.create(
        
        Geojson.date()

      ).then().catch(err=>{
          console.error()
        })

        Geojson.find({ where:{}}).then(()=>{

          return  cb(null, { status: true});

        }).catch(err=>{
          console.error(err)
          return  cb(err, null);
        })

    };

    Geojson.geojson = (date, cb) => {
      date = parseInt(date);
      console.log(date);
        Geojson.find({where: {'properties.day': date}}).then((models) =>{

        console.log(models);
          return cb(null, models);

        }).catch(err=>{
          console.error(err);
          return  cb(err, null);
        })
    };

    Geojson.remoteMethod('geojson',{
        http: {path:'/geojson/:date' , verb: 'get'},
        accepts: [{arg: 'date', required:true, type: 'string', description: 'date'}],
              //{arg: 'count', required:true, type: 'string', description: 'count'}],
        //accepts: [{arg: 'id', required:true , type: 'string', description: 'POS id'},
        //    {arg: 'type', required:true , type: 'string', description: 'Notification type'},
            //{arg: 'req', type: 'object', http: {source:'req'}}],
        returns: [{arg: 'models', type:'array', description: 'status of this operation', root: true}],
        
    });
    Geojson.remoteMethod('addSourdeToDB',{
      http: {path:'/addSourdeToDB' , verb: 'get'},
      accepts: [{arg: 'req', type: 'object', http: {source:'req'}}],
            //{arg: 'count', required:true, type: 'string', description: 'count'}],
      //accepts: [{arg: 'id', required:true , type: 'string', description: 'POS id'},
      //    {arg: 'type', required:true , type: 'string', description: 'Notification type'},
          //],
      //returns: [{arg: 'data', type:'array', description: 'status of this operation', root: true}],
      
    });
};
