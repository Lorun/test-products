export const ADD_PRODUCT = 'product/ADD_PRODUCT';


const ACTION_HANDLERS = {
    [ADD_PRODUCT]: (state, action) => {
        return {
            ...state,
            items: [
                action.payload,
                ...state.items
            ]
        }
    }
};


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    items: [],
    isSaving: false
};

export default (state = initialState, action) => {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state
}


export const addProduct = (product) => {
    return dispatch => {
        dispatch({
            type: ADD_PRODUCT,
            payload: product
        });
    }
};