var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');

//use sequalize to connect mysql database with ORM
//connect to marker db path
const sequelize = new Sequelize('postgres://hgzkizzbpxqgbj:8e4dd6538406491dc132eed304ceeb3b827af144545a58f1bc47ef5b747264ff@ec2-50-19-83-146.compute-1.amazonaws.com:5432/dcp3eq9d2lg7ju');

//check wether the connection has been made
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
     })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
     });

//mysql database only has 1 table positions that contain attributes latitude and longitude
const Position = sequelize.define('position', {
    latitude: {
        type: Sequelize.FLOAT
    },
    longitude: {
        type: Sequelize.FLOAT
    }
});

/* will return JSON fill with all markers position */
router.get('/', function(req, res, next) {
    //request all attribute latlong of the markers from markers db
    Position.findAll({attributes: ['latitude', 'longitude']}).then(positions => {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        //put the query result to array
        const result = []
        positions.forEach(function(position) {
           result.push({
               position: {
                   lat: position.latitude,
                   lng: position.longitude,
               },
           })
        })
        //send respond back to react server
        res.json(result);
	  })
});
module.exports = router;
