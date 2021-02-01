import {
    LOGIN_USER,
    REGISTER_USER
} from '../_actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            //... 는 스프레드 오퍼레이터 ...뒤의 값을 똑같이 가져오는것을 의미
            return { ...state, loginSuccess: action.payload }
            break;
        case REGISTER_USER:
            return { ...state, register: action.payload }
            break;
        default:
            return state;
    }
}