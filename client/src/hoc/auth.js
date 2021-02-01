import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action'

export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {
        //option종류
        //null  => 아무나 출입가능
        //true  => 로그인한 유저만
        //false => 로그인한 유저는 출입 불가

        const dispatch = useDispatch()

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response)

                //로그인하지 않은 상태
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push('/login')
                    }
                }//로그인한 상태
                else {
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    }
                    else {
                        if (option === false) {
                            props.history.push('/')
                        }
                    }
                }
            })


        }, [])
        return (
            <SpecificComponent />
        )
    }



    return AuthenticationCheck
}