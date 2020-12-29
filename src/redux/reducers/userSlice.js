import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    data: [],
    error: null
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        getUserLoading: (state) => {
            state.loading = true
        },
        getUserSuccess: (state, {payload}) => {
            state.loading = false;
            state.data = [...state.data, ...payload]
        },
        getUserFailed: (state, {payload}) => {
            state.loading = false;
            state.error = payload
        },
        addUserLoading: (state) => {
            state.loading =  true
        },
        addUserSuccess: (state, {payload}) => {
            state.loading = false;
            state.data = [payload, ...state.data]
        },
        addUserFailed: (state, {payload}) => {
            state.loading = false;
            state.error = payload
        }

    }
});

export const {
    getUserLoading,
    getUserSuccess,
    getUserFailed,
    addUserLoading,
    addUserSuccess,
    addUserFailed
} = userSlice.actions;

export default userSlice.reducer;

let pageNumber = 0;
const total_pages = 2;

const USER_URL = "https://reqres.in/api/users";

export const fetchUsers = () => {
    return async (dispatch) => {
        pageNumber++
        if(pageNumber <= total_pages) {
            try {
                dispatch(getUserLoading());
                const res = await fetch(`${USER_URL}?page=${pageNumber}`);
                const users = await res.json();
                dispatch(getUserSuccess(users.data))
            }catch(err) {
                dispatch(getUserFailed(err))
            }
            
        }
    }
}

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })

    return res.json()
}

export const addUser = (user) => {
    return async (dispatch) => {
        try {
            dispatch(addUserLoading());

            postData(USER_URL, user).then((data) => {
                console.log(data)
                dispatch(addUserSuccess(data))

            })

        }catch(error) {
            console.log(error)
            dispatch(addUserFailed(error))
        }
    }
}