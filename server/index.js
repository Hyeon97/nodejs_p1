const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { User } = require('./models/User')
const config = require('./config/key')
const { auth } = require('./middleware/auth')

//
const port = 5000



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("db connected..."))
    .catch(err => console.log(err))




app.get('/', (req, res) => res.send("start"))

app.get('/api/hello', (req, res) => {
    res.send("안녕하세요")
})


//회원가입용 라우터 
app.post('/api/users/register', (req, res) => {

    const user = new User(req.body)

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err })//에러발생시
        return res.status(200).json({ success: true })//성공시
    })
})

app.post('/api/users/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        //이메일이 없는경우
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "존재하지 않는 이메일"
            })
        }
        //이메일이 일치하면 비밀번호 체크
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호 오류" })

            //로그인 성공 >> 토큰 생성
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err)
                //토큰을 저장해야함 쿠키, 로컬 스토리지에 저장해야함
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id })

            })
        })
    })
})

//auth는 미들웨어
app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.iamge,
    })

})

app.get('/api/users/logout', auth, (req, res) => {
    console.log('req.user', req.user)
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
        if (err) return req.json({ success: false, err })
        return res.status(200).send({ success: true })
    })

})


app.listen(port, () => console.log(`app listen port : ${port}`))