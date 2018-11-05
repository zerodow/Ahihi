const intialState = {
    username: 'admin',
    password: 'admin',
    loginSuccess: true,
    userInfo: {}
}

export const reducer = (state = intialState, action) => {
    switch (action.type) {
        case 'LOGINSUCCESS': {
            return {
                ...state,
                loginSuccess: false,
                userInfo: action.user
            }
        }

        default: return state
    }
}
