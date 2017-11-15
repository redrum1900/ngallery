import { API_ROOT } from '../config';

const token = ''

function generateHeaders() {
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token
    };
}

export async function get(url, payload) {
    let parameter = '';
    if (payload) {
        parameter = '?';
        for (var key in payload) {
            if (payload[key] !== '') {
                parameter += `${key}=${payload[key]}&`;
            }
        }
    }

    try {
        let response = await fetch(API_ROOT + url + parameter, {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: generateHeaders()
            }
        });
        let data = await response.json();
        if (response.status === 200) {
            return {
                status: 200,
                data: data
            }
        } else {
            return {
                status: 500,
                msg: data
            }
        }
    } catch (err) {
        console.log(err.message);
        return {
            msg: err.message
        }
    }
}