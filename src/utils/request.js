import { handleRequest } from './api-request';
import { URL_GET_ALL_USER } from './const'
export const getAllUsers = () => {
    return (dispatch) =>
        fetch(URL_GET_ALL_USER, {//link api
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

        })
            .then(response => response.json()) // data trả về ngay lập tức chuyển sang json
            .then(res => { // res chính là dữ liệu đã được chuyển sang json
                console.log('res: ', res)
                return dispatch({ type: 'GET_ALL_USER', userInfos: res, })
            })
            .catch(error => {
                console.log(error)
                return dispatch({ type: 'GET_ALL_USER', userInfos: [], })
            })
}

export const postUser = () => {
    const api = {
        method: 'post',
        url: url_base + 'updateUser',
        data: { id: 1 }
    }
    console.log('api: ', api)
    return (dispatch) =>
        handleRequest(api, (err, datas) => {
            console.log('datas: ', datas)
            console.log('err: ', err)
            if (err) {
                return dispatch({ type: 'GET_ALL_USER', userInfos: [], })
            }

            return dispatch({ type: 'GET_ALL_USER', userInfos: datas, })
        })
}

export function ahihi() {

}