//User의 모델과 스키마 제작
const mongoose = require('mongoose')

const bcrypt = require('bcrypt')
const saltRounds = 10;

const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,//이메일 입력시 빈칸을 자동으로 없애주는 역할
        unique: 1
    },
    password: {
        type: String,
        minlength: 3
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {//룰 번호에 따라 관리자 등등 권한 구분
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {//토큰 유효기간을 의미
        type: Number
    }
})

userSchema.pre('save', function (next) {
    //비밀번호 암호화
    var user = this
    if (user.isModified('password')) {//user내의 비밀번호가 변경된 경우에만 해당 작동
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {//hash >> 암호화된 비밀번호
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    }
    else {
        next()
    }
})


userSchema.methods.comparePassword = function (plainpassword, cb) {
    //들어온 비밀번호와 암호화된 비밀번호
    bcrypt.compare(plainpassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function (cb) {
    let user = this
    //jsonwebtoken을 이용하여 token 생성 .sign이 토큰생성 함수임
    let token = jwt.sign(user._id.toHexString(), 'st')

    user.token = token
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    })

}

userSchema.statics.findByToken = function (token, cb) {
    let user = this

    //토큰 decode
    jwt.verify(token, 'st', function (err, decoded) {
        //유저 아이디를 이용 유저 찾은후
        //클라이언트에서 가져온 token과 db에 보관된 토큰이 일치하는지 확인
        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if (err) return cb(err)
            cb(null, user)
        })
    })
}


const User = mongoose.model('User', userSchema)

module.exports = { User }