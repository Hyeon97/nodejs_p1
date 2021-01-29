const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { User } = require('./models/User')

//
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect("mongodb+srv://Admin:Admin@cluster0.vfnxd.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("db connected..."))
    .catch(err => console.log(err))



app.get('/', (req, res) => res.send("start"))

//회원가입용 라우터 
app.post('/register', (req, res) => {
    const user = new User(req.body)
    user.save((err, doc) => {
        if (err) return res.json({ success: false, err })//에러발생시
        return res.status(200).json({ success: true })//성공시
    })
})


app.listen(port, () => console.log(`app listen port : ${port}`))