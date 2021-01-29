//User의 모델과 스키마 제작
const mongoose = require('mongoose')

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

const User = mongoose.model('User', userSchema)

module.exports = { User }