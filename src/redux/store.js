const intialState = {
    username: 'admin',
    password: 'admin',
    loginSuccess: false
}

export const reducer = (state = intialState, action) => {
    switch (action.type) {
        case 'LOGINSUCCESS': {
            return {
                ...state,
                loginSuccess: false
            }
        }

        default: return state
    }
}
