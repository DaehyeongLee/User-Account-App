const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; //salt가 몇글자인지 나타낸다.
const jwt = require('jsonwebtoken')

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

userSchema.pre('save', function(next) {
    var user = this;

    //password가 변경될때만 아래 조건을 실행한다
    if(user.isModified('password')) {
        //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err)
                        
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash; //password 를 hash로 교체해준다
                next()
            })
        })

    } else {
        next() //이것이 있어야 다음으로 넘어간다.
    }        

})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    //plainPassword 1234567 암호화된 비밀번호 sasdqoiwhid~~
    //두 비밀번호가 같은지 체크할려면?? 
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {

    var user = this;

    //jsonwebtoken을 이용해서 token 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User } //User를 다른 파일에서도 쓸 수 있도록 export