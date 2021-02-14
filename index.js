//첫 npm 시작: npm init -> 디폴트로 넘어가고 author만 넣어준다.
//express 라이브러리 설치: npm install express --save //왜 --save? => 해줘야 package.json에 들어간다.
//DB 연결: 몽구스를 설치한다 -> npm install mongoose --save
const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());
//cookie
app.use(cookieParser());

const config = require('./config/key') //DB 정보를 외부에 노출하지 않기 위해 key를 설정

const {User} = require('./models/User');

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, { //mongodb 홈페이지 connect에서 정보 가져와 커넥트
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then( () => console.log('MongoDB Connected success...'))
.catch(err => console.log(err))

//기본 route
app.get('/', (req, res) => res.send("Hello World!!"))

//회원 가입 route
app.post('/register', (req, res) => {
    //회원가입 할때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.
    const user = new User(req.body) //req.body는 json 형식으로 넘어온다

    //save를 하기전에 비밀번호를 암호화 해야 한다.
    user.save((err, doc) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true //성공했을 시 success true가 뜬다
        })
    }) //user model에 저장이 된다.

})

app.post('/login', (req, res) => {
    //요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({email: req.body.email}, (err, user) => { //mongoDB에서 제공하는 method
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인한다.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
                return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})
        
            //비밀번호까지 맞다면 토큰을 생성하기.
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err); //400은 에러가 있다는 뜻

                //토큰을 저장한다. 쿠키?, 로컬스토리지?
                res.cookie("x_auth", user.token) //x_auth 이름으로 쿠키가 들어감
                .status(200)
                .json({loginSuccess: true, userId: user._id})

            })
        })

    }) 

    

    //비밀번호까지 맞다면 토큰을 생성하기.
})


app.listen(port, () => console.log('Example app listening on port ' + port))

//메모: mongodb 홈페이지 -> Network Access -> Add 클릭 후 내 IP 등록 -> npm run start

//초기 git 저장소 생성 git init, git 상태 확인: git status
//Git 설정: Working Directory ---git add---> Staging Area ---git Commit---> Git repository---git push--->Git Remote(github) 
//Local을 Remote에 연결하기 위해 ssh 설정 필요. 이는 git ssh 검색 후 따라하면 된다.
//ssh 설치 되있는지 확인: git bash에서 ls -a ~/.ssh

//Body Parser를 통해 클라이언트(브라우저)의 입력값을 서버로 가져올 수 있다. -> npm install body-parser --save
//Body 데이터를 분석(Parse)해서 req.body로 출력해주는 것이다
//postman을 통해 json 형식으로 client에서 서버로 값을 보내줄 수 있다. 

//node mon: 서버를 내리고 올리지 않아도 소스의 변화를 감지해서 보여줌 ==> npm install nodemon --save-dev
//package.json에 "nodemon": "nodemon index.js" 추가하고 ==> npm run nodemon

//bcrypt: 비밀번호를 암호화하여 DB에 저장하기 위한 라이브러리 ==> npm install bcrypt --save
//jsonwebtoken: 토큰을 생성하기 위한 라이브러리 ==> npm install jsonwebtoken --save
//토큰을 쿠키에 저장하기 위해 cookie-parser 라이브러리 필요 ==> npm install cookie-parser --save