import { HOST_URL, GET } from './const'
import { func } from 'prop-types';
function callApi(url, method, body, callbackSuccess, callbackError) {
    fetch(url, {//link api
        method: method, //method
        headers: { // config header
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
    })
        .then(response => response.json()) // data trả về ngay lập tức chuyển sang json
        .then((res) => {
            callbackSuccess(res);
        })
        .catch((error) => {
            callbackError(error);
        })
}

export function getAllSensor(type, page, callbackSuccess, callbackError) {
    let url = `${HOST_URL}${type}/${page}`
    callApi(url, GET, null, callbackSuccess, callbackError)
}

export function getData(type, value, callbackSuccess, callbackError) {
    let url = `${HOST_URL}${type}/${value}`
    callApi(url, GET, null, callbackSuccess, callbackError)
}
