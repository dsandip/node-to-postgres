var express = require('express');
var pg = require('pg');
var app = express();

app.get('/', function (req, res) {

  var conString = "pg://admin:jackknife-approbation-sioux@postgres.hasura:5432/hasuradb";
  var client = new pg.Client(conString);
  client.connect();

  var query = client.query("SELECT * from test");
  query.on("row", function (row, result) {
      result.addRow(row);
  });
  query.on("end", function (result) {
      console.log(JSON.stringify(result.rows, null, "    "));
      client.end();

      res.send("Data in table 'test':</br>" + JSON.stringify(result.rows, null, "    "));
  });
  query.on("error",function(error) {
      console.log(error);
      res.send('Yo momma not so fat she crashed this query!');
    }); 
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
