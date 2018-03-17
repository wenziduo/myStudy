import { LOADING } from '../actions/layout';
/*
* 初始化state
 */
const initState = {
    loading: false
};
/*
* reducer
 */
export default function reducer(state = initState, action) {
    switch (action.type) {
        case LOADING:
            state.loading = action.params
            return {
                loading: state.loading
            };
        default:
            return state
    }
}