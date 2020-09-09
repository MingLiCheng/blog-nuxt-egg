/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-05-19 11:24:04
 */
import { createStore } from 'redux'
import reducer from './reducer';
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store
