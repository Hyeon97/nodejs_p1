const { User } = require('../models/User')

let auth = (req, res, next) => {
    //로그인 인증 처리

    //클라이언트 쿠키에서 토큰을 가져오기
    let token = req.cookies.x_auth

    //토큰 복호화후 유저 찾기
    User.findByToken(token, (err, user) => {
        if (err) throw err
        if (!user) return res.json({ isAuth: false, error: true })

        req.token = token
        req.user = user
        next()//next를 넣는이유 : 모든작업이 끝나고 다음작업으로 넘기기 위해

    })

    //유저가 있는경우

    //유저가 없는경우

}

module.exports = { auth }