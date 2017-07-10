var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');

//use sequalize to connect mysql database with ORM
//connect to marker db path
const sequelize = new Sequelize('mysql://root@localhost:3306/marker');

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
