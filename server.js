//https://console.aws.amazon.com/ AWS RDS

//file 읽어옴
const fs = require("fs");

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

//실제로 mysql에 연결한 연결 객체를 다룰 수 있도록 해줌
const connection = mysql.createConnection({
  host : conf.host,
  user : conf.user,
  password : conf.password,
  port : conf.port,
  database : conf.database
});

connection.connect();

app.get('/api/customers',(req, res) => {
    connection.query(
      "SELECT * FROM management.customer"
      ,(err, rows, fields) =>{
        res.send(rows);
      }
    );
     
});
//추 후 서버에 get 전송 된 데이터가 정확한 json 형태인지 확인 하는 사이트가 있음
//https://jsonlint.com
app.listen(port, ()=>console.log(`Listening on port ${port}`));