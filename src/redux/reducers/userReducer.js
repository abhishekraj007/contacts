
// Actions types
export const userTypes = {
    FETCH_REQUEST: "FETCH_REQUEST",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_FAILED: "FETCH_FAILED",
    GET_USERS: "GET_USERS"
}


// Actions

export const getUsers = () => {
    return {
        type: userTypes.GET_USERS
    }
}

export const fetchUserRequest = () => {
    return {
        type: userTypes.FETCH_REQUEST
    }
}

export const fetchUserSuccess = (users) => {
    return {
        type: userTypes.FETCH_SUCCESS,
        payload: users
    }
}

export const fetchUserFailed = (errors) => {
    return {
        type: userTypes.FETCH_FAILED,
        payload: errors
    }
}

// Action Creators
export const fetchUsers = () => {

    return async (dispatch, getState) => {
        dispatch(fetchUserRequest())
        try {
            const res = await fetch('https://reqres.in/api/users?page=1');
            const users = await res.json();
            console.log(users)
            dispatch(fetchUserSuccess(users.data))

        }catch(err) {
            console.log(err);
            dispatch(fetchUserFailed(err))
        }

    }
}


const initialState = {
    loading: false,
    data: [],
    error: null
}

const userReducer = (state = initialState, actions) => {
    switch(actions.type) {
        case userTypes.FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case userTypes.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                data: actions.payload
            }
        case userTypes.FETCH_FAILED:
            return {
                ...state,
                loading: false,
                errors: actions.payload
            }

        default:
            return state
    }
}

export default userReducer;