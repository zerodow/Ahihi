const intialState = {
    username: 'admin',
    password: 'admin',
    loginSuccess: false,
    userInfo: {}
}

export const reducer = (state = intialState, action) => {
    switch (action.type) {
        case 'LOGINSUCCESS': {
            return {
                ...state,
                loginSuccess: true,
                userInfo: action.user
            }
        }

        default: return state
    }
}
