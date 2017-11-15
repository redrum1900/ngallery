import { combineReducers } from 'redux';

import home from './home/duck';
import images from './image/duck';

const reducers = combineReducers({
    home,images
});

export default reducers;
