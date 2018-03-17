import { ADD, DELETE, DETAIL } from '../actions/address';
/*
* 初始化state
 */
const initState = {
    address: [{
        name: '测试人',
        phone: '17682304017',
        area: '浙江省杭州市西湖区',
        street: '古墩路171号',
        code: '332225',
        addr_id: 1,
    }]
};
//数组找到指定位置
function indexOf(arr, item) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].addr_id === item){
            return i;
        }
    }
    return -1;
}
//数组找到指定位置
function objIndexOf(arr, item) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].addr_id === item.addr_id){
            return i;
        }
    }
    return -1;
}
/*
* reducer
 */
export default function reducer(state = initState, action) {
    switch (action.type) {
        case ADD:
            state.address.push(action.params)
            return {
                address: state.address
            };
        case DELETE:
            const i = indexOf(state.address,action.params)
            state.address.splice(i,1)
            return {
                address: state.address
            };
        case DETAIL:
            const j = objIndexOf(state.address,action.params)
            state.address.splice(j,1,action.params)
            return {
                address: state.address
            };
        default:
            return state
    }
}