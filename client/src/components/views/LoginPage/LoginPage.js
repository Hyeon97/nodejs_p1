import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'


const LoginPage = (props) => {
    const dispatch = useDispatch()
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const LoginButtonClick = (event) => {
        setEmail("")
        setPassword("")
    }
    const onsubmitHandler = (event) => {
        //무조건 적인 페이지 리프레쉬를 막아줌
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body)).then(response => {
            //리액트에서 페이지 이동하는 방법
            if (response.payload.loginSuccess) {
                props.history.push('/')
            }
            else {
                alert("로그인 실패")
            }
        })
    }

    return (
        <div style={{
            display: "flex", justifyContent: 'center', alignItems: "center", width: '100%', height: '100vh'
        }}>
            <form style={{ display: "flex", flexDirection: "column" }}
                onSubmit={onsubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button type="submit" >Login</button>
            </form>

        </div>
    )

}

export default LoginPage