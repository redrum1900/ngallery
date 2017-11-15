// import { take, fork, call, put } from "redux-saga/effects";
import { fromJS } from 'immutable';

import actionTypes from '../util/actionTypes';
import { get } from '../util/request';

import { I_ROOT, T_ROOT } from '../config'


// ActionTypes
export const IMAGE = actionTypes('gallery', 'IMAGE')

/*actions*/

/*获取首页*/
export const getImages = (payload) => {
    return async (dispatch) => {
        const { status, data, msg } = await get(`/api/gallery/${payload}`);
        if (status && status !== 200) {
            alert(msg)
            // dispatch({ type: CONTACT.SUCCEEDED })
            // history.goBack();
        } else {
            let res = [];

            const {images,media_id} = data;

            images.pages.map((page,i)=>{
                res.push({
                    url:`${I_ROOT}/galleries/${media_id}/${i+1}.${page.t==='j'?'jpg':'png'}`
                })
            })

            dispatch({
                type: IMAGE.SUCCEEDED, data: {
                    data: res
                }
            })
        }
    }
}

/*state*/

const initialState = fromJS({
    images: []
});

/*reducer*/

export default function (state = initialState, action) {
    let result = state;

    switch (action.type) {
        case IMAGE.SUCCEEDED: {
            return result.set('images', fromJS(action.data.data));
        }
        default:
            return state;
    }
}
