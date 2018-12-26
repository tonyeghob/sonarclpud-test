'use strict';
const utils = require('./utils');
const keys = require('./keys');

// setup decent logging
const { createLogger, format, transports } = require('winston');
const logger = createLogger({
  level: utils.GetEnvironmentVar('ARCUS_LOG_LEVEL','info'),
  format: format.combine(
    format.splat(),
    format.simple(),
    format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [new transports.Console()]
});
logger.info('Log level is %s', logger.level)


var express = require('express');
//var search = require('./views/search.html');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
var path = require('path');
var mysql = require('mysql');
var connection  = require('express-myconnection');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'static')));


//create mysql Connection
  var connection = mysql.createConnection({
//  	host: 'localhost',
//  	user: 'node1',
//  	password: 'node',
//  	database: 'node_project'

  	user: keys.mysqlUser,
  	host: keys.mysqlHost,
  	database: keys.mysqlDatabase,
  	password: keys.mysqlPassword,
  	port: keys.mysqlPort

    })

  //Establish MySQL connection
  connection.connect(function(err) {
     if (err)
        throw err
     else {
         // Start the app when connection is ready
         app.listen(3001);
         logger.info('Connected to MySQL. Web server listening on port 3001');
   }
  });


//app.set('view engine', 'pug');
//app.set('views', './views');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+ '/index.html'));
});

app.get('/index.html', function(req, res) {
  res.sendFile(path.join(__dirname+ '/index.html'));
});

app.get('/add_project', function(req, res) {
  res.sendFile(path.join(__dirname+ '/add_project.html'));
});

app.get('/help', function(req, res) {
  res.sendFile(path.join(__dirname+ '/help.html'));
});

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));



//app.post('/post_project', function(req, res) {
//  res.send('Thanks for submitting data about your ' + req.body.family + ' project.');

//  console.log(req.body.family);
//});


app.post('/post_project', function(req, res) {
  res.send('Thanks for submitting data about your ' + req.body.family + ' project.');

  var formData = [[req.body.family,req.body.product,req.body.rating,req.body.client,req.body.contact_name,req.body.overview,req.body.provider,req.body.project,req.body.start_date,req.body.end_date,req.body.status,req.body.contact_email]];

  logger.debug('Formdata: %o', formData);

  connection.query('CREATE TABLE IF NOT EXISTS arcus (family varchar(250) DEFAULT NULL, product varchar(320) DEFAULT NULL,  experience int(255) DEFAULT NULL, client varchar(320) DEFAULT NULL,contact varchar(320) DEFAULT NULL,overview text(65532) DEFAULT NULL,provider varchar(100) DEFAULT NULL,project varchar(320) DEFAULT NULL, start_date varchar(100) DEFAULT NULL,end_date varchar(320) DEFAULT NULL,status varchar(100) DEFAULT NULL,contact_email varchar(320) DEFAULT NULL );')
  connection.query('INSERT INTO arcus (family, product,experience, client,contact,overview,provider,project,start_date,end_date,status,contact_email) VALUES ?', [formData]) , function(req,res,err) {
    if(err) {
      res.send('Error');
    } else {
      res.send('Success, table created');
    }
  };

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+ '/Arcus.html'));
  });

});

//app.get('/search.html', function(req, res) {
//  res.sendFile(path.join(__dirname+ '/search.html'));
  //res.send('You sent the name "' + req.query + '".');
app.get('/search', function (req, res) {
  logger.debug('Query: %s', req.query.search);

    //connection.query("SELECT * FROM arcus WHERE family  like '%" + req.query.search + "%'", function(err, rows, fields) {
  connection.query("SELECT * FROM arcus WHERE CONCAT(IFNULL(family, ''),IFNULL(product, ''),IFNULL(experience, ''),IFNULL(client, ''),IFNULL(contact, ''),IFNULL(overview, ''),IFNULL(provider,''),IFNULL (project, ''),IFNULL(status, ''))  like '%" + req.query.search + "%'", function(err, rows, fields) {
    logger.debug('Result: %o',rows);
    res.render('search_results',{data:rows});
  });
});
