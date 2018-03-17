import address from './reducers/address';
import layout from './reducers/layout';

export default function combineReducers(state = {}, action) {
    return {
        address: address(state.address, action),
        layout: layout(state.layout, action)
    }
}