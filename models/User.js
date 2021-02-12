const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //빈칸이 같이 입력했을 때 없애주는 것에 true
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { //유저의 역할 (관리자, 유저... )
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: { //토큰의 유효기간
        type: Number
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User } //User를 다른 파일에서도 쓸 수 있도록 export