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

/* post to create new marker */
router.post('/', function(req, res, next) {
    //put the the latitude and longitude from request to create new record to the marker db
    Position.create({ latitude: req.query.latitude, longitude: req.query.longitude });
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send("200")
});

module.exports = router;
