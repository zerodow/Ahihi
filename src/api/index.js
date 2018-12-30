import { HOST_URL, GET, GET_ABOVE } from './const'
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

export function getData(type, value, page, callbackSuccess, callbackError) {
    if (type === GET_ABOVE) {
        let url = `${HOST_URL}${type}/${value.farm_id}/${value.device_id}/${page}`
        callApi(url, GET, null, callbackSuccess, callbackError)
    } else {
        let url = `${HOST_URL}${type}/${value}/${page}`
        callApi(url, GET, null, callbackSuccess, callbackError)
    }

}
