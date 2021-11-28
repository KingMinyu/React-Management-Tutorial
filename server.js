const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));


app.get('/api/customers',(req, res) => {
    res.send([
        {
            'id' : 1,
            'image' : 'https://placeimg.com/64/64/1',
            'name' : '민유선',
            'birthday' : '941009',
            'gender' : '여자',
            'job' : '직장인'
          }
          ,{
            'id' : 2,
            'image' : 'https://placeimg.com/64/64/2',
            'name' : '임지현',
            'birthday' : '940404',
            'gender' : '여자',
            'job' : '직장인'
          }
          ,{
            'id' : 3,
            'image' : 'https://placeimg.com/64/64/3',
            'name' : '민우동',
            'birthday' : '190927',
            'gender' : '남자',
            'job' : '댕'
          }
    ]);
});
//추 후 서버에 get 전송 된 데이터가 정확한 json 형태인지 확인 하는 사이트가 있음
//https://jsonlint.com
app.listen(port, ()=>console.log(`Listening on port ${port}`));