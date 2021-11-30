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

app.delete('/api/customers/:id',(req,res) =>{
  let sql = 'UPDATE customer SET isDelete = 1 where id = ?';
  let params = [req.params.id];
  connection.query(sql,params,
    (err, rows, fields) =>{
      res.send(rows);
    }
  )
});

//실제로 mysql에 연결한 연결 객체를 다룰 수 있도록 해줌
const connection = mysql.createConnection({
  host : conf.host,
  user : conf.user,
  password : conf.password,
  port : conf.port,
  database : conf.database
});

connection.connect();

const multer = require('multer');
const upload = multer({dest : './upload'});

app.get('/api/customers',(req, res) => {
    connection.query(
      "SELECT * FROM management.customer WHERE isDelete = 0"
      ,(err, rows, fields) =>{
        res.send(rows);
      }
    );
     
});

/*
미들웨어 upload.single('avatar')는 뒤의 function(req, res)함수가 실행되기 전에 먼저 실행.
미들웨어는 사용자가 전송한 데이터 중에서 만약 파일이 포함되어 있다면,
그 파일을 가공해서 req객체에 file 이라는 프로퍼티를 암시적으로 추가도록 약속되어 있는 함수.
upload.single('avatar') 의 매개변수 'avatar'는 form을 통해 전송되는 파일의 name속성을 가져야 함.

https://wayhome25.github.io/nodejs/2017/02/21/nodejs-15-file-upload/
*/

//사용자가 접근할 수 있도록 설정
app.use('/image',express.static('./upload'));

app.post('/api/customers', upload.single('image'),(req, res) => {
  let sql = 'INSERT INTO customer VALUES (null,?,?,?,?,?,now(),0)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image,name,birthday,gender,job];

  connection.query(sql, params, 
        (err,rows,fields) => {
          res.send(rows);
          console.log(err);
        }
      );
  });

//추 후 서버에 get 전송 된 데이터가 정확한 json 형태인지 확인 하는 사이트가 있음
//https://jsonlint.com
app.listen(port, ()=>console.log(`Listening on port ${port}`));