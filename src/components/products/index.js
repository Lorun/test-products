const ADD_PRODUCT = 'product/ADD_PRODUCT';
const TOGGLE_SAVING = 'product/TOGGLE_SAVING';
const FETCH_PRODUCTS = 'product/FETCH_PRODUCTS';


const ACTION_HANDLERS = {
    [ADD_PRODUCT]: (state, action) => (
        {
            ...state,
            items: [
                action.payload,
                ...state.items
            ]
        }
    ),
    [TOGGLE_SAVING]: (state, action) => (
        {
            ...state,
            isSaving: !state.isSaving
        }
    ),
    [FETCH_PRODUCTS]: (state, action) => (
        {
            ...state,
            items: action.payload
        }
    )
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


// ------------------------------------
// Actions
// ------------------------------------
export const addProduct = (values) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_SAVING
        });

        dispatch({
            type: ADD_PRODUCT,
            payload: values
        });

        api.saveProduct(values)
            .then(response => response.json())
            .then(response => {
                dispatch({
                    type: TOGGLE_SAVING
                });
            });
    }
};

export const fetchProducts = () => {
    return (dispatch) => {
        api.fetchProducts()
            .then(response => response.json())
            .then(response => {
                dispatch({
                    type: FETCH_PRODUCTS,
                    payload: Object.keys(response).map(key => response[key])
                });
            });
    }
};


const api = {
    fetchProducts: () => {
        return fetch('http://1.lobarev.com/api/product', {
            method: 'get',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            }
        });
    },
    saveProduct: (product) => {
        return fetch('http://1.lobarev.com/api/product', {
            method: 'post',
            body: JSON.stringify({
                'name': product.name,
                'colors': product.colors.join()
            }),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            }
        });
    }
};
