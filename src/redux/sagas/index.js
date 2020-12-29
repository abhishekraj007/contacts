import { getUserFailed, getUserLoading, getUserSuccess } from "../reducers/userSlice";
import {takeLatest,  call, put} from "redux-saga/effects";
import {userTypes} from "../reducers/userReducer"

function* fetchUserSaga() {
    const url = 'https://reqres.in/api/users?page=1';

    yield put(getUserLoading())
    try{
        const res = yield call(fetch, url);
        const users = yield res.json();
        console.log(users)
        yield put(getUserSuccess(users.data))

    }catch(err){
        yield put(getUserFailed(err))

    }
}

export default function* rootSaga() {
    yield takeLatest(userTypes.GET_USERS, fetchUserSaga)
}