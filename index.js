//첫 npm 시작: npm init -> 디폴트로 넘어가고 author만 넣어준다.
//express 라이브러리 설치: npm install express --save //왜 --save? => 해줘야 package.json에 들어간다.
//DB 연결: 몽구스를 설치한다 -> npm install mongoose --save
const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://daelee:1@boilerplate.0pvpi.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then( () => console.log('MongoDB Connected success...'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send("Hello World!"))

app.listen(port, () => console.log('Example app listening on port ' + port))




//메모: mongodb 홈페이지 -> Network Access -> Add 클릭 후 내 IP 등록 -> npm run start

//초기 git 저장소 생성 git init, git 상태 확인: git status
//Git 설정: Working Directory ---git add---> Staging Area ---git Commit---> Git repository---git push--->Git Remote(github) 
//Local을 Remote에 연결하기 위해 ssh 설정 필요. 이는 git ssh 검색 후 따라하면 된다.

//Body Parser를 통해 클라이언트(브라우저)의 입력값을 서버로 가져올 수 있다. -> npm install body-parser --save
//postman을 통해 json 형식으로 client에서 서버로 값을 보내줄 수 있다. 

//node mon: 서버를 내리고 올리지 않아도 소스의 변화를 감지해서 보여줌 ==> npm install nodemon --save-dev
//package.json에 "nodemon": "nodemon index.js" 추가하고 ==> npm run nodemon

//bcrypt: 비밀번호를 암호화하여 DB에 저장하기 위한 라이브러리 ==> npm install bcrypt --save
