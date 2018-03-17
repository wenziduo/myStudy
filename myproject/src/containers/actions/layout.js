/*action*/
export const LOADING = "LAYOUT_MAIN_LOADING";

//loading动画
export function loading(params) {
    return {
        type: LOADING,
        params: params
    }
}