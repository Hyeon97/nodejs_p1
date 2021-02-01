import { combineReducers } from 'redux'
import user from './user_reducer'

const rootReducer = combineReducers({//루트 reduce를 합쳐줌
    user
})

export default rootReducer