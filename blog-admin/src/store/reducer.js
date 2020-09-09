/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-05-19 11:29:15
 */
const defaultState = {
    // 默认 数据
    placeHolder: 'Write Something',
    list: ['早上4点起床，锻炼身体', '中午下班游泳一小时'],
};
// Store: 是整个项目中需要管理的数据信息,这里我们没有什么数据，所以用空对象来表示
export default (state = defaultState, action) => {
    console.log('state', state, 'action', action);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case 'addNewToDo':
            newState.list.push(action.value); //push新的内容到列表中去
            newState.inputValue = '';
            return newState;
        case'delItemFormToDoList':
            newState.list.splice(action.delIndex, 1);
            return newState;
        default:
            break;
    }
    return state;
};
