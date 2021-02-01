import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'

const RegisterPage = (props) => {
    const dispatch = useDispatch()
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [CPassword, setCPassword] = useState("")


    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    const onCPasswordHandler = (event) => {
        setCPassword(event.currentTarget.value)
    }

    const onsubmitHandler = (event) => {
        //무조건 적인 페이지 리프레쉬를 막아줌
        event.preventDefault();
        if (Password !== CPassword) {
            return alert("비밀번호를 확인해주세요")
        }

        let body = {
            name: Name,
            email: Email,
            password: Password
        }

        dispatch(registerUser(body)).then(response => {
            //리액트에서 페이지 이동하는 방법
            if (response.payload.success) {
                props.history.push('/login')
            }
            else {
                alert("회원가입 실패")

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
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <label>Confirm Password</label>
                <input type="password" value={CPassword} onChange={onCPasswordHandler} />
                <br />
                <button type="submit" >회원가입</button>
            </form>

        </div>
    )

}

export default withRouter(RegisterPage)

