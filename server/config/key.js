if(process.env.NODE_ENV === 'production') { // process.env.NODE_ENV는 환경 변수. deploy된 부분이라면 production을 결과로 가져옴
    module.exports = require('./prod') //deploy된 부분에서는 heroku를 이용해 db 정보를 가져감
} else {
    module.exports = require('./dev') //local에서 db 정보를 가져감, 이때 dev.js는 gitignore에서 등록해서 push할 때 올라가지 않도록 해야함
}