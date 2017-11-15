// import { take, fork, call, put } from "redux-saga/effects";
import { fromJS } from 'immutable';

import actionTypes from '../util/actionTypes';
import { get } from '../util/request';

import { I_ROOT, T_ROOT } from '../config'


// ActionTypes
export const BOOKS = actionTypes('gallery', 'BOOKS')

/*actions*/

let booksArray=[];

/*获取首页*/
export const getBooks = (payload) => {
    return async (dispatch) => {
        const url = payload.key === ''?`/api/galleries/all?page=${payload.page}`:`/api/galleries/search?query=${payload.key}&page=${payload.page}`
           
        const { status, data, msg } = await get(url, payload);
        
        if (status && status !== 200) {
            alert(msg)
            // dispatch({ type: CONTACT.SUCCEEDED })
            // history.goBack();
        } else {

            data.result.map((book, i) => {
                data.result[i].thumb = `${T_ROOT}/galleries/${book.media_id}/thumb.jpg`;
                data.result[i].name = book.title.japanese?book.title.japanese:book.title.english;
            })

            let res = [];

            if(payload.page === 1){
                res = data.result;
                booksArray = res;
            }else{
                let res = initialState.get('books').toJS()
                booksArray = booksArray.concat(data.result)
            }


            dispatch({
                type: BOOKS.SUCCEEDED, data: {
                    data: booksArray
                }
            })
        }
    }
}

/*state*/

const initialState = fromJS({
    books: []
});

/*reducer*/

export default function (state = initialState, action) {
    let result = state;

    switch (action.type) {
        case BOOKS.SUCCEEDED: {
            return result.set('books', fromJS(action.data.data));
        }
        default:
            return state;
    }
}
