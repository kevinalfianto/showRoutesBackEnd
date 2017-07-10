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

/* post to delete a marker */
router.post('/', function(req, res, next) {
    //put the the latitude and longitude from request to delete a record from marker db
    Position.destroy({
        where: {
            latitude: req.query.latitude, 
            longitude: req.query.longitude
        }
    });
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send("200")
});
module.exports = router;
