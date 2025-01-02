import {fork} from 'redux-saga/effects';
import auth from './auth/saga';
import serviceCategories from './serviceCategories/saga'

export default function* root() {
    yield fork(auth);
    yield fork(serviceCategories);
}