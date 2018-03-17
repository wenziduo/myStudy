/*action*/
export const ADD = "ADDRESS_MAIN_ADD";
export const DELETE = "ADDRESS_MAIN_DELETE";
export const DETAIL = "ADDRESS_MAIN_DETAIL";

//新增
export function add(params) {
    return {
        type: ADD,
        params: params
    }
}

//删除
export function deleteAddress(index) {
    return {
        type: DELETE,
        params: index
    }
}

//修改
export function detailAddress(params) {
    return {
        type: DETAIL,
        params: params
    }
}